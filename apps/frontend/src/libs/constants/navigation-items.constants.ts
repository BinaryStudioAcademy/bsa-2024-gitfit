import { AppRoute } from "~/libs/enums/enums.js";
import { type NavigationItem } from "~/libs/types/types.js";

const sidebarItems: NavigationItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "project",
		label: "Projects",
	},
	// TODO: Add other links
	// {
	// 	href: ,
	// 	icon: "access",
	// 	label: "Access Management",
	// },
	// {
	// 	href: ,
	// 	icon: "contributors",
	// 	label: "Contributors",
	// },
	// {
	// 	href: ,
	// 	icon: "analytics",
	// 	label: "Analytics",
	// },
];

export { sidebarItems };
