import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

import { PAGE_NAME } from "./page-name.constant.js";

const SIDEBAR_ITEMS: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: PAGE_NAME.PROJECTS,
	},
	{
		href: AppRoute.ACCESS_MANAGEMENT,
		icon: "access",
		label: PAGE_NAME.ACCESS_MANAGEMENT,
	},
];

export { SIDEBAR_ITEMS };
