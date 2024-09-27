import {
	ExceptionMessage,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ProjectGroupGetAllItemResponseDto } from "../../types/types.js";

const checkProjectGroupPermission = (payload: {
	projectGroup: ProjectGroupGetAllItemResponseDto;
	projectsPermissions: ValueOf<typeof ProjectPermissionKey>[];
	user: UserAuthResponseDto;
}): number => {
	const { projectGroup, projectsPermissions, user } = payload;
	const { id: projectId } = projectGroup.projectId;

	const userProjectsPermissions = user.projectGroups
		.filter((group) => projectId && group.projectId === projectId)
		.flatMap((projectGroup) => projectGroup.permissions);

	const hasProjectPermission = checkHasPermission(
		projectsPermissions,
		userProjectsPermissions,
	);

	if (!hasProjectPermission) {
		throw new HTTPError({
			message: ExceptionMessage.NO_PERMISSION,
			status: HTTPCode.FORBIDDEN,
		});
	}

	return projectGroup.id;
};

export { checkProjectGroupPermission };
