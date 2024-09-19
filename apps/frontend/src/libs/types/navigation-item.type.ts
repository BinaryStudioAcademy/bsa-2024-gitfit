import { type AppRoute } from "~/libs/enums/enums.js";
import {
	type IconName,
	type Permissions,
	type ValueOf,
} from "~/libs/types/types.js";

type NavigationItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
	pagePermissions?: Permissions;
};

export { type NavigationItem };
