import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type GetHeadersOptions = {
	contentType: null | ValueOf<typeof ContentType>;
	hasAuth: boolean;
	token?: string | undefined;
};

export { type GetHeadersOptions };
