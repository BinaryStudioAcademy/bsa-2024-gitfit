import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";

import { ActivityLogsApiPath } from "./libs/enums/enums.js";
import {
	type ActivityLogCreateRequestDto,
	type ActivityLogGetAllResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	serverUrl: string;
};

class AnalyticsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, serverUrl }: Constructor) {
		super({ baseUrl, http, path: APIPath.ACTIVITY_LOGS, serverUrl });
	}

	public async sendAnalytics(
		payload: ActivityLogCreateRequestDto,
		token: string,
	): Promise<ActivityLogGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ActivityLogsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
				token,
			},
		);

		return await response.json<ActivityLogGetAllResponseDto>();
	}
}

export { AnalyticsApi };
