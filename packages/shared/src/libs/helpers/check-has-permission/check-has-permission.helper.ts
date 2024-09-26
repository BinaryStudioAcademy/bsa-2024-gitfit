import { type PermissionGetAllItemResponseDto } from "../../../modules/permissions/permissions.js";
import { type ProjectPermissionsGetAllItemResponseDto } from "../../../modules/project-permissions/project-permissions.js";
import { EMPTY_LENGTH } from "../../constants/constants.js";

const checkHasPermission = (
	requiredPermissions: string[],
	permissions:
		| PermissionGetAllItemResponseDto[]
		| ProjectPermissionsGetAllItemResponseDto[],
): boolean => {
	if (requiredPermissions.length === EMPTY_LENGTH) {
		return true;
	}

	return requiredPermissions.some((permission) =>
		permissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
