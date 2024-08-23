import { AppRoute } from "~/libs/enums/enums.js";

import { type NavigationItem } from "./sidebar-item/type.js";

const sidebarItems: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: "Projects",
	},
	{
		href: "#",
		icon: "access",
		label: "Access Management",
	},
	{
		href: "#",
		icon: "contributors",
		label: "Contributors",
	},
	{
		href: "#",
		icon: "analytics",
		label: "Analytics",
	},
];

export { sidebarItems };
