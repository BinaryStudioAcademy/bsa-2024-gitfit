import fastifyStatic from "@fastify/static";
import swagger, { type StaticDocumentSpec } from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyError, type FastifyInstance } from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ServerErrorType } from "~/libs/enums/enums.js";
import { type ValidationError } from "~/libs/exceptions/exceptions.js";
import { type Config } from "~/libs/modules/config/config.js";
import { type Database } from "~/libs/modules/database/database.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { authorization } from "~/libs/plugins/authorization/authorization.plugin.js";
import {
	type ServerCommonErrorResponse,
	type ServerValidationErrorResponse,
	type ValidationSchema,
	type WhiteRoute,
} from "~/libs/types/types.js";
import { type ProjectService } from "~/modules/projects/projects.js";
import { type UserService } from "~/modules/users/users.js";

import { type TaskScheduler } from "../task-scheduler/task-scheduler.js";
import { type Token } from "../token/token.js";
import { JobCronPattern } from "./libs/enums/enums.js";
import {
	type ServerApplication,
	type ServerApplicationApi,
	type ServerApplicationRouteParameters,
} from "./libs/types/types.js";

type Constructor = {
	apis: ServerApplicationApi[];
	config: Config;
	database: Database;
	logger: Logger;
	services: {
		projectService: ProjectService;
		userService: UserService;
	};
	taskScheduler: TaskScheduler;
	title: string;
	token: Token;
	whiteRoutes: WhiteRoute[];
};

class BaseServerApplication implements ServerApplication {
	private apis: ServerApplicationApi[];

	private app: FastifyInstance;

	private config: Config;

	private database: Database;

	private logger: Logger;

	private services: {
		projectService: ProjectService;
		userService: UserService;
	};

	private taskScheduler: TaskScheduler;

	private title: string;

	private token: Token;

	private whiteRoutes: WhiteRoute[];

	public constructor({
		apis,
		config,
		database,
		logger,
		services,
		taskScheduler,
		title,
		token,
		whiteRoutes,
	}: Constructor) {
		this.apis = apis;
		this.config = config;
		this.database = database;
		this.logger = logger;
		this.services = services;
		this.taskScheduler = taskScheduler;
		this.title = title;
		this.token = token;
		this.whiteRoutes = whiteRoutes;

		this.app = Fastify({
			ignoreTrailingSlash: true,
		});
	}

	private initErrorHandler(): void {
		this.app.setErrorHandler(
			(error: FastifyError | ValidationError, _request, reply) => {
				if ("issues" in error) {
					this.logger.error(`[Validation Error]: ${error.message}`);

					for (let issue of error.issues) {
						this.logger.error(`[${issue.path.toString()}] — ${issue.message}`);
					}

					const response: ServerValidationErrorResponse = {
						details: error.issues.map((issue) => ({
							message: issue.message,
							path: issue.path,
						})),
						errorType: ServerErrorType.VALIDATION,
						message: error.message,
					};

					return reply.status(HTTPCode.UNPROCESSED_ENTITY).send(response);
				}

				if (error instanceof HTTPError) {
					this.logger.error(
						`[HTTP Error]: ${String(error.status)} – ${error.message}`,
					);

					const response: ServerCommonErrorResponse = {
						errorType: ServerErrorType.COMMON,
						message: error.message,
					};

					return reply.status(error.status).send(response);
				}

				this.logger.error(error.message);

				const response: ServerCommonErrorResponse = {
					errorType: ServerErrorType.COMMON,
					message: error.message,
				};

				return reply.status(HTTPCode.INTERNAL_SERVER_ERROR).send(response);
			},
		);
	}

	private initJobs(): void {
		const { projectService } = this.services;
		this.taskScheduler.start(
			JobCronPattern.INACTIVE_PROJECT_NOTIFICATION,
			() => void projectService.processInactiveProjects(),
		);
	}

	private initPlugins(): void {
		const { userService } = this.services;

		this.app.register(authorization, {
			token: this.token,
			userService,
			whiteRoutes: this.whiteRoutes,
		});
	}

	private async initServe(): Promise<void> {
		const staticPath = path.join(
			path.dirname(fileURLToPath(import.meta.url)),
			"../../../../public",
		);

		await this.app.register(fastifyStatic, {
			prefix: "/",
			root: staticPath,
		});

		this.app.setNotFoundHandler(async (_request, response) => {
			await response.sendFile("index.html", staticPath);
		});
	}

	private initValidationCompiler(): void {
		this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
			return (data): ReturnType<ValidationSchema["parse"]> => {
				return schema.parse(data);
			};
		});
	}

	public addRoute(parameters: ServerApplicationRouteParameters): void {
		const { handler, method, path, preHandlers, validation } = parameters;

		const routeOptions = {
			handler,
			method,
			preHandler: preHandlers ?? [],
			schema: {
				body: validation?.body,
				query: validation?.query,
			},
			url: path,
		};

		this.app.route(routeOptions);

		this.logger.info(`Route: ${method} ${path} is registered.`);
	}

	public addRoutes(parameters: ServerApplicationRouteParameters[]): void {
		for (let parameter of parameters) {
			this.addRoute(parameter);
		}
	}

	public async init(): Promise<void> {
		this.logger.info("Application initialization...");

		await this.initServe();

		await this.initMiddlewares();

		this.initJobs();

		this.initPlugins();

		this.initValidationCompiler();

		this.initErrorHandler();

		this.initRoutes();

		this.database.connect();

		try {
			await this.app.listen({
				host: this.config.ENV.APP.HOST,
				port: this.config.ENV.APP.PORT,
			});

			this.logger.info(
				`Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
					this.config.ENV.APP.ENVIRONMENT as string
				}.`,
			);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(error.message, {
					cause: error.cause,
					stack: error.stack,
				});
			}

			throw error;
		}
	}

	public async initMiddlewares(): Promise<void> {
		await Promise.all(
			this.apis.map(async (api) => {
				this.logger.info(
					`Generating swagger documentation for API ${api.version}...`,
				);

				await this.app.register(swagger, {
					mode: "static",
					specification: {
						document: api.generateDoc(
							this.title,
						) as StaticDocumentSpec["document"],
					},
				});

				await this.app.register(swaggerUi, {
					routePrefix: `${api.version}/documentation`,
				});
			}),
		);
	}

	public initRoutes(): void {
		const routers = this.apis.flatMap((api) => api.routes);

		this.addRoutes(routers);
	}
}

export { BaseServerApplication };
