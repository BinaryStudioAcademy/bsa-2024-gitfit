import {
	AppRoute,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
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
		pageProjectPermissions: [
			ProjectPermissionKey.VIEW_PROJECT,
			ProjectPermissionKey.EDIT_PROJECT,
			ProjectPermissionKey.MANAGE_PROJECT,
		],
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
		pagePermissions: [PermissionKey.MANAGE_ALL_PROJECTS],
	},
	{
		href: AppRoute.ANALYTICS,
		icon: "analytics",
		label: "Analytics",
		pagePermissions: [
			PermissionKey.VIEW_ALL_PROJECTS,
			PermissionKey.MANAGE_ALL_PROJECTS,
		],
		pageProjectPermissions: [
			ProjectPermissionKey.VIEW_PROJECT,
			ProjectPermissionKey.EDIT_PROJECT,
			ProjectPermissionKey.MANAGE_PROJECT,
		],
	},
];

export { SIDEBAR_ITEMS };
