import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ProjectGroupApi } from "./project-groups-api.js";

const projectGroupApi = new ProjectGroupApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { projectGroupApi };
export {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupCreateResponseDto,
	type ProjectGroupGetAllItemResponseDto,
} from "./libs/types/types.js";
export { projectGroupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/project-groups.js";
