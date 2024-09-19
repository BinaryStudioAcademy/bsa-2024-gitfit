import { type FastifyRequest } from "fastify";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Permissions } from "~/libs/types/types.js";

const checkUserPermissions = (routePermissions: Permissions): APIPreHandler => {
	return (request: FastifyRequest, _, done): void => {
		const { user } = request;

		if (!user) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const hasPermission = checkHasPermission(
			routePermissions,
			user.groups.flatMap((group) => group.permissions),
		);

		if (!hasPermission) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		done();
	};
};

export { checkUserPermissions };
