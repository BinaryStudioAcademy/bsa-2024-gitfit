import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

import { type APIHandler } from "./api-handler.type.js";
import { type APIPreHandler } from "./api-pre-handler.type.js";

type ControllerRouteParameters = {
	handler: APIHandler;
	method: HTTPMethod;
	path: string;
	preHandlers?: APIPreHandler[];
	validation?: {
		body?: ValidationSchema;
		query?: ValidationSchema;
	};
};

export { type ControllerRouteParameters };
