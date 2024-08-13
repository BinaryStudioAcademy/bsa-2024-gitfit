import { type HTTPMethod } from "./http-method.type.js";

type HTTPOptions = {
	headers: Headers;
	method: HTTPMethod;
	payload: BodyInit | null;
};

export { type HTTPOptions };
