import { type ServerApplicationRouteParameters } from "./types.js";

type ServerApplicationApi = {
	generateDoc(title: string): object;
	routes: ServerApplicationRouteParameters[];
	version: string;
};

export { type ServerApplicationApi };
