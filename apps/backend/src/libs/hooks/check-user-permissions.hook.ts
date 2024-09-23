import { ExceptionMessage } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	type APIHandlerOptions,
	type APIPreHandler,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const checkUserPermissions = (
	routePermissions: string[],
	getProjectId?: (options: APIHandlerOptions) => number | undefined,
): APIPreHandler => {
	return (options, done): void => {
		const user = options.user as null | UserAuthResponseDto;
		const shouldValidateProject = Boolean(getProjectId);
		const projectId = getProjectId?.(options);

		if (!user) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const hasPermission = checkHasPermission(routePermissions, [
			...user.groups.flatMap((group) => group.permissions),
			...user.projectGroups
				.filter(
					(group) =>
						!shouldValidateProject ||
						(projectId && group.projectId.includes(projectId)),
				)
				.flatMap((projectGroup) => projectGroup.permissions),
		]);

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
