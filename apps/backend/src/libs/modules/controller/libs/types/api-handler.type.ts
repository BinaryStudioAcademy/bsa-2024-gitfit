import { type APIHandlerOptions } from "./api-handler-options.type.js";
import { type APIHandlerResponse } from "./api-handler-response.type.js";

type APIHandler = (
	options: APIHandlerOptions,
) => APIHandlerResponse | Promise<APIHandlerResponse>;

export { type APIHandler };
