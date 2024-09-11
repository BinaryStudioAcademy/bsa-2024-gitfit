import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { ProjectApiKeysApi } from "./project-api-keys-api.js";

const projectApiKeysApi = new ProjectApiKeysApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { projectApiKeysApi };
export {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/project-api-keys.js";
