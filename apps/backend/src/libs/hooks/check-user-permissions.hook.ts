import { type FastifyRequest } from "fastify";

import { APIPath, ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

const checkUserPermissions = (routePermissions: string[]): APIPreHandler => {
	return (request: FastifyRequest, _, done): void => {
		const { params, url, user } = request;

		if (!user) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const resourceId = (params as { id?: string }).id;

		if (url.includes(APIPath.USERS) && Number(resourceId) === user.id) {
			done();

			return;
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
