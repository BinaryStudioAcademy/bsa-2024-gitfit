import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { JWTExpired } from "jose/errors";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { AuthError } from "~/modules/auth/auth.js";
import { type UserService } from "~/modules/users/user.service.js";

type Options = {
	token: Token;
	userService: UserService;
	whiteRoutes: readonly RegExp[];
};

const authorization = fp<Options>((fastify, options, done) => {
	const { token, userService, whiteRoutes } = options;

	fastify.decorateRequest("user", null);

	fastify.addHook("preHandler", async (request: FastifyRequest) => {
		const { url } = request.raw;

		for (const whiteRoute of whiteRoutes) {
			if (whiteRoute.test(url as string)) {
				return;
			}
		}

		const jwtToken = request.headers["authorization"];

		if (!jwtToken) {
			throw new AuthError({
				message: ExceptionMessage.NO_TOKEN_PROVIDED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

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
