import { type ContentType } from "~/libs/enums/enums.js";
import { type HTTPOptions } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type HTTPApiOptions = {
	contentType?: ValueOf<typeof ContentType>;
	hasAuth: boolean;
	payload?: HTTPOptions["payload"];
	query?: Record<string, string>;
} & Omit<HTTPOptions, "headers" | "payload">;

export { type HTTPApiOptions };
