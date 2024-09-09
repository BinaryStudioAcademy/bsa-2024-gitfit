import { type FastifyRequest } from "fastify";

type APIPreHandler = (request: FastifyRequest) => Promise<void> | void;

export { type APIPreHandler };
