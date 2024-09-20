import { type PermissionGetAllItemResponseDto } from "../../../modules/permissions/permissions.js";
import { type RequiredPermission } from "../../types/required-permission.js";

const checkHasPermission = (
	requiredPermissions: RequiredPermission[],
	permissions: PermissionGetAllItemResponseDto[],
): boolean => {
	return requiredPermissions.every((requiredPermission) =>
		typeof requiredPermission === "string"
			? permissions.some(
					(userPermission) => userPermission.key === requiredPermission,
				)
			: requiredPermission.some((permission) =>
					permissions.some(
						(userPermission) => userPermission.key === permission,
					),
				),
	);
};

export { checkHasPermission };
