import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { checkHasPermission } from "../helpers.js";

const getPermittedNavigationItems = (
	items: NavigationItem[],
	userPermissions: PermissionGetAllItemResponseDto[],
): NavigationItem[] => {
	return items.filter(({ pagePermissions = [] }) =>
		checkHasPermission(pagePermissions, userPermissions),
	);
};

export { getPermittedNavigationItems };
