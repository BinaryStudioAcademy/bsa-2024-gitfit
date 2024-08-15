import swaggerJsdoc from "swagger-jsdoc";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";

import {
	type ServerApplicationApi,
	type ServerApplicationRouteParameters,
} from "./libs/types/types.js";

class BaseServerApplicationApi implements ServerApplicationApi {
	private config: Config;

	public routes: ServerApplicationRouteParameters[];

	public version: string;

	public constructor(
		version: string,
		config: Config,
		...handlers: ServerApplicationRouteParameters[]
	) {
		this.version = version;
		this.config = config;
		this.routes = handlers.map((handler) => ({
			...handler,
			path: `/api/${this.version}${handler.path}`,
		}));
	}

	public generateDoc(title: string): ReturnType<typeof swaggerJsdoc> {
		const isLocal = this.config.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL;

		const controllerExtension = isLocal ? "ts" : "js";

		return swaggerJsdoc({
			apis: [`src/modules/**/*.controller.${controllerExtension}`],
			definition: {
				components: {
					securitySchemes: {
						bearerAuth: {
							bearerFormat: "JWT",
							scheme: "bearer",
							type: "http",
						},
					},
				},
				info: {
					title,
					version: `${this.version}.0.0`,
				},
				openapi: "3.0.0",
				servers: [{ url: "/api/v1" }],
			},
		});
	}
}

export { BaseServerApplicationApi };
