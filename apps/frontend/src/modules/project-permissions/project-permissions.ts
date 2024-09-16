import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ProjectPermissionsApi } from "./project-permissions-api.js";

const projectPermissionsApi = new ProjectPermissionsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { projectPermissionsApi };
export {
	type ProjectPermissionsGetAllItemResponseDto,
	type ProjectPermissionsGetAllResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/project-permissions.js";
