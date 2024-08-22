import { type ValueOf } from "@git-fit/shared";

import { type IconName } from "~/libs/components/icon/types/types.js";
import { type AppRoute } from "~/libs/enums/app-route.enum.js";

type sidebarItemType = {
	icon: IconName;
	id: string;
	text: string;
	to?: ValueOf<typeof AppRoute>;
};

export { type sidebarItemType };
