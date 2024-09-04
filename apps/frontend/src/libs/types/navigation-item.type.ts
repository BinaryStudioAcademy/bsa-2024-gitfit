import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

type NavigationItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

export { type NavigationItem };
