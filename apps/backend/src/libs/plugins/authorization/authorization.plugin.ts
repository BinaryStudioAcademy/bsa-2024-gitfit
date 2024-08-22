import { type FastifyReply, type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
import { UserError, userService } from "~/modules/users/users.js";

import { WHITE_ROUTES } from "../libs/enums/enums.js";

const authorization = fp((fastify, _, done) => {
	fastify.decorateRequest("user", null);

	fastify.addHook(
		"preHandler",
		async (request: FastifyRequest, reply: FastifyReply) => {
			const { url } = request.raw;

			for (const whiteRoute of WHITE_ROUTES) {
				if (whiteRoute.test(url as string)) {
					return;
				}
			}

			const authToken = request.headers["authorization"];

			if (!authToken) {
				return await reply
					.code(HTTPCode.UNAUTHORIZED)
					.send({ error: ExceptionMessage.NO_TOKEN_PROVIDED });
			}

			try {
				const { userId } = token.decodeToken(authToken);
				const user = await userService.find(userId as number);

				request.user = user;
			} catch (error) {
				if (error instanceof UserError) {
					return await reply
						.code(HTTPCode.NOT_FOUND)
						.send({ error: ExceptionMessage.USER_NOT_FOUND });
				}

				return await reply
					.code(HTTPCode.UNAUTHORIZED)
					.send({ error: ExceptionMessage.INVALID_TOKEN });
			}
		},
	);

	done();
});

export { authorization };
