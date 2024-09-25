import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { checkHasPermission } from "../helpers.js";

const getPermittedNavigationItems = (
	items: NavigationItem[],
	userPermissions: PermissionGetAllItemResponseDto[],
): NavigationItem[] => {
	const allPermittedItems = items.filter(
		({ pagePermissions = [], pageProjectPermissions = [] }) =>
			(pagePermissions.length !== EMPTY_LENGTH &&
				checkHasPermission(pagePermissions, userPermissions)) ||
			(pageProjectPermissions.length !== EMPTY_LENGTH &&
				checkHasPermission(pageProjectPermissions, userPermissions)),
	);

	return allPermittedItems.filter(
		(item, index, self) =>
			index ===
			self.findIndex((navigationItem) => navigationItem.label === item.label),
	);
};

export { getPermittedNavigationItems };
