import { type PermissionGetAllItemResponseDto } from "src/modules/permissions/permissions.js";

const checkHasPermission = (
	requiredPermissions: string[],
	permissions: PermissionGetAllItemResponseDto[],
): boolean => {
	return requiredPermissions.every((permission) =>
		permissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
