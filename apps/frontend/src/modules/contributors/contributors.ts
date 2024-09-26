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
export { ContributorOrderByKey } from "./libs/enums/enums.js";
export {
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
	type ContributorSplitRequestDto,
} from "./libs/types/types.js";
export {
	contributorMergeValidationSchema,
	contributorPatchValidationSchema,
	contributorSplitValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/contributors.js";
