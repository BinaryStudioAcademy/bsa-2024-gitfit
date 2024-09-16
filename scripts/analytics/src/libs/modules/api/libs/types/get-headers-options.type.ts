import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type GetHeadersOptions = {
	authToken: null | string;
	contentType: null | ValueOf<typeof ContentType>;
};

export { type GetHeadersOptions };
