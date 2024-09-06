import { type FastifyReply, type FastifyRequest } from "fastify";

import { type APIPreHandler } from "~/libs/modules/controller/libs/types/api-pre-handler.type.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

type ServerApplicationRouteParameters = {
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	method: HTTPMethod;
	path: string;
	preHandler?: APIPreHandler[];
	validation?: {
		body?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
