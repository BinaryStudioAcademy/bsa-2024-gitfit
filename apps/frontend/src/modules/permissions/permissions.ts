import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PermissionApi } from "./permissions-api.js";

const permissionApi = new PermissionApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { permissionApi };
export {
	type PermissionGetAllItemResponseDto,
	type PermissionGetAllResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/permissions.js";
