import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: "Projects",
	},
	{
		href: AppRoute.ACCESS_MANAGEMENT,
		icon: "access",
		label: "Access Management",
		pagePermissions: [PermissionKey.MANAGE_USER_ACCESS],
	},
	{
		href: AppRoute.CONTRIBUTORS,
		icon: "contributors",
		label: "Contributors",
	},
];

export { SIDEBAR_ITEMS };
