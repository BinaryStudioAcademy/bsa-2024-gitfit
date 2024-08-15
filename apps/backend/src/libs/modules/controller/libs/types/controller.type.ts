import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

import { type ControllerRouteParameters } from "./types.js";

type Controller = {
	addRoute(options: ControllerRouteParameters): void;
	routes: ServerApplicationRouteParameters[];
};

export { type Controller };
