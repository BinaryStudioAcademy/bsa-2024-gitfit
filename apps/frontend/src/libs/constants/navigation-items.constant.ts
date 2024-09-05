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
	},
	{
		href: AppRoute.ANALYTICS,
		icon: "analytics",
		label: "Analytics",
	},
];

export { SIDEBAR_ITEMS };
