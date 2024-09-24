import { type PermissionKey } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

const checkHasProjectPermission = (
	authenticatedUser: null | UserAuthResponseDto,
	projectId: number,
	permissionKeys: ValueOf<typeof PermissionKey>[],
): boolean => {
	return Boolean(
		authenticatedUser?.projectGroups.some(
			(group) =>
				group.projectId.includes(projectId) &&
				group.permissions.some((permission) =>
					permissionKeys.includes(
						permission.key as ValueOf<typeof PermissionKey>,
					),
				),
		),
	);
};

export { checkHasProjectPermission };
