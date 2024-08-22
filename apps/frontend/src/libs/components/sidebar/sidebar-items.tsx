import { AppRoute } from "~/libs/enums/app-route.enum.js";

import { type NavigationItem } from "./sidebar-item/type.js";

const sidebarItems: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: "Projects",
	},
	{
		icon: "access",
		label: "Access Management",
	},
	{
		icon: "contributors",
		label: "Contributors",
	},
	{
		icon: "analytics",
		label: "Analytics",
	},
];

export { sidebarItems };
