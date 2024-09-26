import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
	type ProjectPermissionsGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { checkHasPermission } from "../helpers.js";

const getPermittedNavigationItems = (
	items: NavigationItem[],
	userPermissions: PermissionGetAllItemResponseDto[] = [],
	projectPermissions: ProjectPermissionsGetAllItemResponseDto[] = [],
): NavigationItem[] => {
	return items.filter(
		({ pagePermissions = [], pageProjectPermissions = [] }) => {
			const hasPagePermissions =
				pagePermissions.length !== EMPTY_LENGTH &&
				checkHasPermission(pagePermissions, userPermissions);

			const hasProjectPermissions =
				pageProjectPermissions.length !== EMPTY_LENGTH &&
				checkHasPermission(pageProjectPermissions, projectPermissions);

			return hasPagePermissions || hasProjectPermissions;
		},
	);
};

export { getPermittedNavigationItems };
