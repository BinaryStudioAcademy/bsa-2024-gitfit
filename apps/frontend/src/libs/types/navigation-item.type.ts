import {
	type AppRoute,
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type NavigationItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
	pagePermissions?: ValueOf<typeof PermissionKey>[];
	pageProjectPermissions?: ValueOf<typeof ProjectPermissionKey>[];
};

export { type NavigationItem };
