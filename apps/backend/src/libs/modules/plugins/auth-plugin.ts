import { type FastifyReply, type FastifyRequest } from "fastify";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

import { token } from "../token/token.js";
import { WHITE_ROUTES } from "./libs/constants/constants.js";
import { extractUser } from "./libs/helpers/helpers.js";

const authPlugin = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
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
		request.user = extractUser(decoded);
	} catch {
		return await reply
			.code(HTTPCode.UNAUTHORIZED)
			.send({ error: ExceptionMessage.INVALID_TOKEN });
	}
};

export { authPlugin };
