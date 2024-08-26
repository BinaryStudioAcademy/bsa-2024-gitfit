import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: "Projects",
	},
];

export { SIDEBAR_ITEMS };
