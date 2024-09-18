import { EMPTY_LENGTH } from "../../../libs/constants/empty-length.constant.js";
import { type PermissionGetAllItemResponseDto } from "../../../modules/permissions/permissions.js";

const checkHasPermission = (
	requiredPermissions: string[],
	permissions: PermissionGetAllItemResponseDto[],
): boolean => {
	if (requiredPermissions.length === EMPTY_LENGTH) {
		return true;
	}

	return requiredPermissions.some((permission) =>
		permissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
