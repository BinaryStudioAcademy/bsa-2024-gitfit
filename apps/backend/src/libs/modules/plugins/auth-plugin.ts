import { type FastifyReply, type FastifyRequest } from "fastify";

import { AuthErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

import { token } from "../token/token.js";
import { OPEN_ROUTES } from "./libs/constants/constants.js";

const authPlugin = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const { url } = request.raw;

	for (const openRoute of OPEN_ROUTES) {
		if (openRoute.test(url as string)) {
			return;
		}
	}

	const authToken = request.headers["authorization"];

	if (!authToken) {
		return await reply
			.code(HTTPCode.UNAUTHORIZED)
			.send({ error: AuthErrorMessage.NO_TOKEN_PROVIDED });
	}

	try {
		const decoded = await token.verifyToken(authToken);

		if (typeof decoded === "object" && "userId" in decoded) {
			request.user = { userId: decoded["userId"] as string };
		}
	} catch {
		return await reply
			.code(HTTPCode.UNAUTHORIZED)
			.send({ error: AuthErrorMessage.INVALID_TOKEN });
	}
};

export { authPlugin };
