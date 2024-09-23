import { type APIHandlerOptions } from "./api-handler-options.type.js";

type APIPreHandler = (options: APIHandlerOptions, done: () => void) => void;

export { type APIPreHandler };
