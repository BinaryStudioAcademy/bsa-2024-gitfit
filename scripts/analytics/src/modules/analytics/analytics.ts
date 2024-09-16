import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";

import { AnalyticsApi } from "./analytics-api.js";

const analyticsApi = new AnalyticsApi({
	baseUrl: config.ENV.APP.API_ORIGIN_URL,
	http,
	serverUrl: config.ENV.APP.SERVER_URL,
});

export { analyticsApi };
export { AnalyticsService } from "./analytics.service.js";
