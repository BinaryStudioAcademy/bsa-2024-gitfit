import { type FastifyReply, type FastifyRequest } from "fastify";

import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

type ServerApplicationRouteParameters = {
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	method: HTTPMethod;
	path: string;
	preHandlers?: ((
		request: FastifyRequest,
		reply: FastifyReply,
		done: () => void,
	) => void)[];
	validation?: {
		body?: ValidationSchema;
		query?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
