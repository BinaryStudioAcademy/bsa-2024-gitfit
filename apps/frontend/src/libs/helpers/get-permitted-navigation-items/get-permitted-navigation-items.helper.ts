import { checkHasPermission } from "@git-fit/shared";

import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
} from "~/libs/types/types.js";

const getPermittedNavigationItems = (
	items: NavigationItem[],
	userPermissions: PermissionGetAllItemResponseDto[],
): NavigationItem[] => {
	return items.filter(({ pagePermissions = [] }) =>
		checkHasPermission(pagePermissions, userPermissions),
	);
};

export { getPermittedNavigationItems };
