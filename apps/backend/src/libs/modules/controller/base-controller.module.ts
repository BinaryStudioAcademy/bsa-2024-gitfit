import { type Logger } from "~/libs/modules/logger/logger.js";
import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

import {
	type APIHandler,
	type APIHandlerOptions,
	type Controller,
	type ControllerRouteParameters,
} from "./libs/types/types.js";

class BaseController implements Controller {
	private apiUrl: string;

	private logger: Logger;

	public routes: ServerApplicationRouteParameters[];

	public constructor(logger: Logger, apiPath: string) {
		this.logger = logger;
		this.apiUrl = apiPath;
		this.routes = [];
	}

	private async mapHandler(
		handler: APIHandler,
		request: Parameters<ServerApplicationRouteParameters["handler"]>[0],
		reply: Parameters<ServerApplicationRouteParameters["handler"]>[1],
	): Promise<void> {
		this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

		const handlerOptions = this.mapRequest(request);
		const { payload, status } = await handler(handlerOptions);

		return await reply.status(status).send(payload);
	}

	private mapRequest(
		request: Parameters<ServerApplicationRouteParameters["handler"]>[0],
	): APIHandlerOptions {
		const { body, params, query } = request;

		return {
			body,
			params,
			query,
		};
	}

	public addRoute(options: ControllerRouteParameters): void {
		const { handler, path } = options;
		const fullPath = this.apiUrl + path;

		this.routes.push({
			...options,
			handler: (request, reply) => this.mapHandler(handler, request, reply),
			path: fullPath,
		});
	}
}

export { BaseController };
