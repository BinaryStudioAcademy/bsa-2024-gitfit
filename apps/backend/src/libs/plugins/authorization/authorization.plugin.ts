import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { JWTExpired } from "jose/errors";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { type HTTPMethod, type WhiteRoute } from "~/libs/types/types.js";
import { AuthError } from "~/modules/auth/auth.js";
import { type UserService } from "~/modules/users/user.service.js";

import { checkIsWhiteRoute } from "./helpers/helpers.js";

type Options = {
	token: Token;
	userService: UserService;
	whiteRoutes: WhiteRoute[];
};

const authorization = fp<Options>((fastify, options, done) => {
	const { token, userService, whiteRoutes } = options;

	fastify.decorateRequest("user", null);

	fastify.addHook("onRequest", async (request: FastifyRequest) => {
		if (
			checkIsWhiteRoute({
				method: request.method as HTTPMethod,
				url: request.url,
				whiteRoutes,
			})
		) {
			return;
		}

		const BEARER_PREFIX = "Bearer ";
		const authHeader = request.headers["authorization"];

		if (!authHeader?.startsWith(BEARER_PREFIX)) {
			throw new AuthError({
				message: ExceptionMessage.NO_TOKEN_PROVIDED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const jwtToken = authHeader.slice(BEARER_PREFIX.length);

		try {
			const payload = await token.verifyToken(jwtToken);
			const { userId } = payload;

			if (!userId) {
				throw new AuthError({
					message: ExceptionMessage.INVALID_TOKEN_NO_USER_ID,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			const user = await userService.find(userId as number);
			request.user = user;
		} catch (error) {
			const isTokenExpiredError = error instanceof JWTExpired;

			if (isTokenExpiredError) {
				throw new AuthError({
					cause: error,
					message: ExceptionMessage.TOKEN_EXPIRED,
					status: HTTPCode.UNAUTHORIZED,
				});
			}

			if (error instanceof AuthError) {
				throw error;
			}

			throw new AuthError({
				message: ExceptionMessage.INVALID_TOKEN,
				status: HTTPCode.UNAUTHORIZED,
			});
		}
	});

	done();
});

export { authorization };
