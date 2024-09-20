import { type AppRoute } from "~/libs/enums/enums.js";
import {
	type IconName,
	type RequiredPermission,
	type ValueOf,
} from "~/libs/types/types.js";

type NavigationItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
	pagePermissions?: RequiredPermission[];
};

export { type NavigationItem };
