import {
	ExceptionMessage,
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	type APIHandlerOptions,
	type APIPreHandler,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ValueOf } from "../types/types.js";

const checkUserPermissions = (
	permissions: ValueOf<typeof PermissionKey>[],
	projectsPermissions?: ValueOf<typeof ProjectPermissionKey>[],
	getProjectId?: (options: APIHandlerOptions) => number | undefined,
): APIPreHandler => {
	return (options, done): void => {
		const user = options.user as UserAuthResponseDto;
		const projectId = getProjectId?.(options);

		const userPermissions = user.groups.flatMap((group) => group.permissions);
		const projectPermissions = projectId
			? user.projectGroups
					.filter((group) => group.projectId === projectId)
					.flatMap((projectGroup) => projectGroup.permissions)
			: [];

		const hasGlobalPermission = checkHasPermission(
			permissions,
			userPermissions,
		);

		const hasProjectPermission =
			projectId && projectsPermissions
				? checkHasPermission(projectsPermissions, projectPermissions)
				: false;

		if (!hasGlobalPermission && (!projectId || !hasProjectPermission)) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		done();
	};
};

export { checkUserPermissions };
