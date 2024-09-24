import { type ProjectPermissionKey } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

const checkHasProjectPermission = (
	projectPermissions: Record<number, ProjectPermissionsGetAllItemResponseDto[]>,
	projectId: number,
	permissionKeys: ValueOf<typeof ProjectPermissionKey>[],
): boolean => {
	const permissionsForProject = projectPermissions[projectId];

	if (!permissionsForProject) {
		return false;
	}

	return permissionKeys.some((requiredKey) =>
		permissionsForProject.some((permission) => permission.key === requiredKey),
	);
};

export { checkHasProjectPermission };
