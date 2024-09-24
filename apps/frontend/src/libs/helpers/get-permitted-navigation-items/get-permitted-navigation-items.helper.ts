import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
	type ProjectPermissionsGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { checkHasPermission } from "../helpers.js";

const getPermittedNavigationItems = (
	items: NavigationItem[],
	userPermissions:
		| PermissionGetAllItemResponseDto[]
		| ProjectPermissionsGetAllItemResponseDto[],
): NavigationItem[] => {
	const itemsWithRootPermissions = items.filter(
		({ pagePermissions = [] }) =>
			pagePermissions.length !== EMPTY_LENGTH &&
			checkHasPermission(pagePermissions, userPermissions),
	);

	const itemsWithProjectPermissions = items.filter(
		({ pageProjectPermissions = [] }) =>
			pageProjectPermissions.length !== EMPTY_LENGTH &&
			checkHasPermission(pageProjectPermissions, userPermissions),
	);

	const allPermittedItems = [
		...itemsWithRootPermissions,
		...itemsWithProjectPermissions,
	];

	return allPermittedItems.filter(
		(item, index, self) =>
			index ===
			self.findIndex((navigationItem) => navigationItem.label === item.label),
	);
};

export { getPermittedNavigationItems };
