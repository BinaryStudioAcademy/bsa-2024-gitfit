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
export {
	type ProjectFindRequestDto,
	type ProjectResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/projects.js";
