import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type GetHeadersOptions = {
	contentType: null | ValueOf<typeof ContentType>;
	hasAuth: boolean;
};

export { type GetHeadersOptions };
