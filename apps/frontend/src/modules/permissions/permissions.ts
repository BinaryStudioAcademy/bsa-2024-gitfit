import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { PermissonsApi } from "./permissions-api.js";

const permissionsApi = new PermissonsApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { permissionsApi };
export { actions, reducer } from "./slices/permissions.js";
