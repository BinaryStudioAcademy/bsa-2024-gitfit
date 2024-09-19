import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ContributorApi } from "./contributors-api.js";

const contributorApi = new ContributorApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { contributorApi };
export {
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
} from "./libs/types/types.js";
export {
	contributorMergeValidationSchema,
	contributorPatchValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/contributors.js";
