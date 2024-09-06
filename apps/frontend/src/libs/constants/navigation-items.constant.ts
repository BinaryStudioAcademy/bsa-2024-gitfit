import { AppRoute } from "~/libs/enums/enums.js";
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
		pagePermissions: ["manage_user_access"],
	},
];

export { SIDEBAR_ITEMS };
