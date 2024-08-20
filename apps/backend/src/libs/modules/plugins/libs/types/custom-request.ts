import { type FastifyRequest } from "fastify";

interface CustomFastifyRequest extends FastifyRequest {
	user?: string;
}

export { type CustomFastifyRequest };
