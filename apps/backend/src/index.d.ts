import { type FastifyRequest } from "fastify";

import { type UserAuthResponseDto } from "./modules/users/libs/types/types.js";

type OriginalFastifyRequest = FastifyRequest;

declare module "fastify" {
	interface FastifyRequest extends OriginalFastifyRequest {
		user: null | UserAuthResponseDto;
	}
}
