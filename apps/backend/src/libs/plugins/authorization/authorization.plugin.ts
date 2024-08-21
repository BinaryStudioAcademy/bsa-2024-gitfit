import { type FastifyReply, type FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";

import { WHITE_ROUTES } from "../libs/constants/constants.js";
import { extractUserFromToken } from "../libs/helpers/helpers.js";

const authorization = fp((fastify, _, done) => {
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
				const decoded = await token.verifyToken(authToken);
				request.user = extractUserFromToken(decoded);
			} catch {
				return await reply
					.code(HTTPCode.UNAUTHORIZED)
					.send({ error: ExceptionMessage.INVALID_TOKEN });
			}
		},
	);

	done();
});

export { authorization };
