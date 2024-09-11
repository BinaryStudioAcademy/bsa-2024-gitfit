import { type PermissionGetAllItemResponseDto } from "../../../modules/permissions/permissions.js";

const checkHasPermission = (
	requiredPermissions: string[],
	permissions: PermissionGetAllItemResponseDto[],
): boolean => {
	return requiredPermissions.some((requiredPermission) =>
		permissions.some(
			(userPermission) => userPermission.key === requiredPermission,
		),
	);
};

export { checkHasPermission };
