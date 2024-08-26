import { type UserAuthResponseDto } from "./modules/users/users.js";

declare module "fastify" {
	interface FastifyRequest {
		user: null | UserAuthResponseDto;
	}
}
