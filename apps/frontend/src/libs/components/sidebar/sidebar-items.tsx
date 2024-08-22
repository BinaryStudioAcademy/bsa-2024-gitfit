import { AppRoute } from "~/libs/enums/app-route.enum.js";

import { type sidebarItemType } from "./sidebar-item/type.js";

const sidebarItems: sidebarItemType[] = [
	{
		icon: "project",
		id: "1",
		text: "Projects",
		to: AppRoute.ROOT,
	},
	{
		icon: "access",
		id: "2",
		text: "Access Management",
	},
	{
		icon: "contributors",
		id: "3",
		text: "Contributors",
	},
	{
		icon: "analytics",
		id: "4",
		text: "Analytics",
	},
];

export { sidebarItems };
