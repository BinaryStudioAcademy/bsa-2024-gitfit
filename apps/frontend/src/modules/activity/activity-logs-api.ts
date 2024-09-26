import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ActivityLogsApiPath } from "./libs/enums/enums.js";
import {
	type ActivityLogGetAllAnalyticsResponseDto,
	type ActivityLogQueryParameters,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ActivityLogApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ACTIVITY_LOGS, storage });
	}

	public async getAll(
		query: ActivityLogQueryParameters,
	): Promise<ActivityLogGetAllAnalyticsResponseDto> {
		const { contributorName, endDate, projectId, startDate } = query;

		const queryToSend = {
			...(contributorName ? { contributorName } : {}),
			endDate,
			startDate,
			...(projectId ? { projectId: String(projectId) } : {}),
		};

		const response = await this.load(
			this.getFullEndpoint(ActivityLogsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: queryToSend,
			},
		);

		return await response.json<ActivityLogGetAllAnalyticsResponseDto>();
	}
}
export { ActivityLogApi };
