import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: NavigationItem[] = [
	{
		href: AppRoute.PROJECTS,
		icon: "project",
		label: "Projects",
		pagePermissions: [
			PermissionKey.VIEW_ALL_PROJECTS,
			PermissionKey.MANAGE_ALL_PROJECTS,
		],
	},
	{
		href: AppRoute.ACCESS_MANAGEMENT,
		icon: "access",
		label: "Access Management",
		pagePermissions: [PermissionKey.MANAGE_USER_ACCESS],
	},
];

export { SIDEBAR_ITEMS };
