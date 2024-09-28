import {
	ExceptionMessage,
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ValueOf } from "../../types/types.js";

const checkPermissions = (payload: {
	projectId?: null | number;
	projectsPermissions?: null | ValueOf<typeof ProjectPermissionKey>[];
	rootPermissions: ValueOf<typeof PermissionKey>[];
	user: UserAuthResponseDto;
}): void => {
	const { projectId, projectsPermissions, rootPermissions, user } = payload;

	const userPermissions = user.groups.flatMap((group) => group.permissions);
	const userProjectPermissions = user.projectGroups
		.filter((group) => projectId && group.projectId === projectId)
		.flatMap((projectGroup) => projectGroup.permissions);

	const hasGlobalPermission = checkHasPermission(
		rootPermissions,
		userPermissions,
	);

	const hasProjectPermission = projectId
		? checkHasPermission(
				projectsPermissions as ValueOf<typeof ProjectPermissionKey>[],
				userProjectPermissions,
			)
		: true;

	if (!hasGlobalPermission && !hasProjectPermission) {
		throw new HTTPError({
			message: ExceptionMessage.NO_PERMISSION,
			status: HTTPCode.FORBIDDEN,
		});
	}
};

export { checkPermissions };
