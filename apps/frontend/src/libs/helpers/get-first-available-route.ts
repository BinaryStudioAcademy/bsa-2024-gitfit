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

	for (const { href, pagePermissions = [] } of sidebarItems) {
		if (
			pagePermissions.some((permission) => userPermissionKeys.has(permission))
		) {
			return href;
		}
	}

	return fallbackRoute;
};

export { getFirstAvailableRoute };
