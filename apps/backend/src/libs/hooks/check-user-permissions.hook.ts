import { type FastifyRequest } from "fastify";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

const checkUserPermissions = (routePermissions: string[]): APIPreHandler => {
	return (request: FastifyRequest): Promise<void> => {
		const { user } = request;

		return new Promise<void>((resolve, reject) => {
			if (!user) {
				reject(
					new HTTPError({
						message: ExceptionMessage.USER_NOT_FOUND,
						status: HTTPCode.UNAUTHORIZED,
					}),
				);

				return;
			}

			const hasPermission = checkHasPermission(
				routePermissions,
				user.groups.flatMap((group) => group.permissions),
			);

			if (!hasPermission) {
				reject(
					new HTTPError({
						message: ExceptionMessage.NO_PERMISSION,
						status: HTTPCode.FORBIDDEN,
					}),
				);

				return;
			}

			resolve();
		});
	};
};

export { checkUserPermissions };
