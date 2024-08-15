import { type HTTPApiOptions } from "./types.js";

type HTTPApi = {
	load(path: string, options: HTTPApiOptions): Promise<Response>;
};

export { type HTTPApi };
