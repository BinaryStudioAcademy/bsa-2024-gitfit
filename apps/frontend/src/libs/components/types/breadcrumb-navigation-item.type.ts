import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { type ValueOf } from "~/libs/types/types.js";

type BreadcrumbNavigationItem = {
	href?: undefined | ValueOf<typeof AppRoute>;
	label: string;
};

export { type BreadcrumbNavigationItem };
