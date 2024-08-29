import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { type ValueOf } from "~/libs/types/types.js";

type BreadcrumbItemType = {
	href?: ValueOf<typeof AppRoute>;
	label: string;
};

export { type BreadcrumbItemType };
