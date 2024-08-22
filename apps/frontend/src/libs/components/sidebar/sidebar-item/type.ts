import { type ValueOf } from "@git-fit/shared";

import { type AppRoute } from "~/libs/enums/app-route.enum.js";

import { type IconName } from "../../icon/types/icon-name.type.js";

type sidebarItemType = {
	icon: IconName;
	id: string;
	text: string;
	to?: ValueOf<typeof AppRoute>;
};

export { type sidebarItemType };
