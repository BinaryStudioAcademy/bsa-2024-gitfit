import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { NotificationsApiPath } from "./libs/enums/enums.js";
import { type NotificationGetAllResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class NotificationApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.NOTIFICATIONS, storage });
	}

	public async getAll(): Promise<NotificationGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(NotificationsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<NotificationGetAllResponseDto>();
	}
}

export { NotificationApi };
