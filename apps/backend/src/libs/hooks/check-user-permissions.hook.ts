import { type FastifyRequest } from "fastify";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { userService } from "~/modules/users/users.js";

const checkUserPermissions = (routePermissions: string[]): APIPreHandler => {
	return async (request: FastifyRequest): Promise<void> => {
		const userId = request.user?.id;

		if (!userId) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const user = await userService.find(userId);

		if (user.groups.length === EMPTY_LENGTH) {
			throw new HTTPError({
				message: ExceptionMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const hasPermission = checkHasPermission(
			routePermissions,
			user.groups.flatMap((group) => group.permissions),
		);

		if (!hasPermission) {
			throw new HTTPError({
				message: ExceptionMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};
};

export { checkUserPermissions };
