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
			const hasRootPermissions = checkHasPermission(
				pagePermissions,
				userPermissions,
			);

			const hasProjectPermissions = checkHasPermission(
				pageProjectPermissions,
				projectPermissions,
			);

			return hasRootPermissions || hasProjectPermissions;
		},
	);
};

export { getPermittedNavigationItems };
