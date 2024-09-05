import { type Permission } from "./libs/types/permissions.type.js";

const checkHasPermission = (
	requiredPermissions: string[],
	permissions: Permission[],
): boolean => {
	return requiredPermissions.every((permission) =>
		permissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
