import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ProjectApi } from "./projects-api.js";

const projectApi = new ProjectApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { projectApi };
export { ProjectValidationRule } from "./libs/enums/enums.js";
export {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
} from "./libs/types/types.js";
export {
	projectCreateValidationSchema,
	projectPatchValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/projects.js";
