import {
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkPermissions } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ProjectGroupGetAllItemResponseDto } from "../../types/types.js";

const checkProjectGroupPermission = (payload: {
	projectGroup: ProjectGroupGetAllItemResponseDto;
	projectsPermissions: ValueOf<typeof ProjectPermissionKey>[];
	rootPermissions: ValueOf<typeof PermissionKey>[];
	user: UserAuthResponseDto;
}): number => {
	const { projectGroup, projectsPermissions, rootPermissions, user } = payload;
	const { id: projectId } = projectGroup.projectId;

	checkPermissions({
		projectId,
		projectsPermissions,
		rootPermissions,
		user,
	});

	return projectGroup.id;
};

export { checkProjectGroupPermission };
