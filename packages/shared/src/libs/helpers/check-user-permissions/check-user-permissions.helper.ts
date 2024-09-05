import { type UserAuthResponseDto } from "../../../modules/users/users.js";

const checkUserPermissions = (
	user: UserAuthResponseDto,
	requiredPermissions: string[],
): boolean => {
	return requiredPermissions.every((permission) =>
		user.groups.some((group) =>
			group.permissions.some(
				(userPermission) => userPermission.key === permission,
			),
		),
	);
};

export { checkUserPermissions };
