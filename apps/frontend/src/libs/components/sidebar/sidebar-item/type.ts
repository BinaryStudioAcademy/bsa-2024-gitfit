import { type ValueOf } from "@git-fit/shared";

import { type IconName } from "~/libs/components/icon/types/types.js";
import { type AppRoute } from "~/libs/enums/app-route.enum.js";

type NavigationItem = {
	href?: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

export { type NavigationItem };
