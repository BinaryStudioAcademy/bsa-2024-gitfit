import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
} from "~/libs/types/types.js";

const getFirstAvailableRoute = (
	userPermissions: PermissionGetAllItemResponseDto[],
	sidebarItems: NavigationItem[],
	fallbackRoute: string,
): string => {
	const userPermissionKeys = new Set(
		userPermissions.map((permission) => permission.key),
	);

	for (const item of sidebarItems) {
		const itemPermissions = item.pagePermissions ?? [];
		const hasAccess = itemPermissions.some((permission) =>
			userPermissionKeys.has(permission),
		);

		if (hasAccess) {
			return item.href;
		}
	}

	return fallbackRoute;
};

export { getFirstAvailableRoute };
