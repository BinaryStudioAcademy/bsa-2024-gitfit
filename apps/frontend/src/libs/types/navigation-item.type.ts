import { type AppRoute, type PermissionKey } from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type NavigationItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
	pagePermissions?: ValueOf<typeof PermissionKey>[];
};

export { type NavigationItem };
