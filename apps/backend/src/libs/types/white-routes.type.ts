import { type HTTPMethod } from "./types.js";

type WhiteRoute = {
	methods: HTTPMethod[];
	path: string;
};

export { type WhiteRoute };
