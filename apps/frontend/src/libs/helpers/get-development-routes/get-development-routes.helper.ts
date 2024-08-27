import { type RouteObject } from "react-router-dom";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";

const isProdaction = config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;

const getDevelopmentRoutes = (...routes: RouteObject[]): RouteObject[] => {
	return isProdaction ? [] : routes;
};

export { getDevelopmentRoutes };
