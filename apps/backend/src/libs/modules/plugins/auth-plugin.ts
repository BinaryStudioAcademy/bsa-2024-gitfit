import { type FastifyReply } from "fastify";

import { AuthErrorMessages } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

import { token } from "../token/token.js";
import { type CustomFastifyRequest } from "./libs/types/types.js";

const openRoutes: Set<RegExp> = new Set([
	/^\/api\/[^/]+\/sign-up$/,
	/^\/api\/[^/]+\/sign-in$/,
]);

const authPlugin = async (
	request: CustomFastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const { url } = request.raw;

	for (const openRoute of openRoutes) {
		if (openRoute.test(url as string)) {
			return;
		}
	}

	const authToken = request.headers["authorization"];

	if (!authToken) {
		return await reply
			.code(HTTPCode.UNAUTHORIZED)
			.send({ error: AuthErrorMessages.NO_TOKEN_PROVIDED });
	}

	try {
		const decoded = await token.verifyToken(authToken);

		if (typeof decoded === "object" && "userId" in decoded) {
			request.user = decoded["userId"] as string;
		}
	} catch {
		return await reply
			.code(HTTPCode.UNAUTHORIZED)
			.send({ error: AuthErrorMessages.INVALID_TOKEN });
	}
};

export { authPlugin };
