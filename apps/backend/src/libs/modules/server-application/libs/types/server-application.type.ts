import { type ServerApplicationRouteParameters } from "./types.js";

type ServerApplication = {
	addRoute(parameters: ServerApplicationRouteParameters): void;
	addRoutes(parameters: ServerApplicationRouteParameters[]): void;
};

export { type ServerApplication };
