import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { NotificationApi } from "./notifications-api.js";

const notificationApi = new NotificationApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { notificationApi };
export {
	type NotificationGetAllItemResponseDto,
	type NotificationGetAllResponseDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/notifications.js";
