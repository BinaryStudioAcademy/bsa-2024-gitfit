import { type FastifyRequest } from "fastify";

type OriginalFastifyRequest = FastifyRequest;

declare module "fastify" {
	interface FastifyRequest extends OriginalFastifyRequest {
		user?: string;
	}
}
