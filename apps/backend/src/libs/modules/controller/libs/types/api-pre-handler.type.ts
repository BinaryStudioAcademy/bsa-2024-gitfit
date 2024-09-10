import { type FastifyReply, type FastifyRequest } from "fastify";

type APIPreHandler = (
	request: FastifyRequest,
	reply: FastifyReply,
	done: () => void,
) => void;

export { type APIPreHandler };
