import { type FastifyRequest } from "fastify";

type APIPreHandler = (request: FastifyRequest) => Promise<void>;

export { type APIPreHandler };
