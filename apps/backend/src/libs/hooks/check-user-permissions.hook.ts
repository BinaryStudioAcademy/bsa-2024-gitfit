import { type FastifyRequest } from "fastify";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { permissionService } from "~/modules/permissions/permissions.js";

const checkPermission = (routePermissions: string): APIPreHandler => {
	return async (request: FastifyRequest): Promise<void> => {
		const userId = request.user?.id;

		if (!userId) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const permissions = await permissionService.getPermissions(userId);

		if (permissions.items.length === EMPTY_LENGTH) {
			throw new HTTPError({
				message: ExceptionMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const hasPermission = permissions.items.some(
			(permission) => permission.key === routePermissions,
		);

		if (!hasPermission) {
			throw new HTTPError({
				message: ExceptionMessage.PERMISSION_NOT_FOUND,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};
};

export { checkPermission };
