import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type BreadcrumbNavigationItem = {
	href?: undefined | ValueOf<typeof AppRoute>;
	label: string;
};

export { type BreadcrumbNavigationItem };
