import { type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { AuthError } from "~/modules/auth/auth.js";
import { type UserService } from "~/modules/users/user.service.js";

import { WHITE_ROUTES } from "../libs/constants/constants.js";
import { isTokenExpiredError } from "../libs/helpers/helpers.js";

type AuthorizationPluginOptions = {
	token: Token;
	userService: UserService;
};

const authorization = fp<AuthorizationPluginOptions>(
	(fastify, options, done) => {
		const { token, userService } = options;

		fastify.decorateRequest("user", null);

		fastify.addHook("preHandler", async (request: FastifyRequest) => {
			const { url } = request.raw;

			for (const whiteRoute of WHITE_ROUTES) {
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

				const user = await userService.find(userId as number);

				request.user = user;
			} catch (error) {
				if (error instanceof Error && isTokenExpiredError(error)) {
					throw new AuthError({
						cause: error,
						message: ExceptionMessage.TOKEN_EXPIRED,
						status: HTTPCode.UNAUTHORIZED,
					});
				}

				throw new AuthError({
					message: ExceptionMessage.INVALID_TOKEN,
					status: HTTPCode.UNAUTHORIZED,
				});
			}
		});

		done();
	},
);

export { authorization };
