import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";

import { AuthAnalyticsService } from "./auth-analytics.service.js";
import { AuthAnalyticsApi } from "./auth-analytics-api.js";

const authAnalyticsApi = new AuthAnalyticsApi({
	baseUrl: config.ENV.APP.API_ORIGIN_URL,
	http,
	serverUrl: config.ENV.APP.SERVER_URL,
});

const authAnalyticsService = new AuthAnalyticsService({
	authAnalyticsApi,
});

export { authAnalyticsApi, authAnalyticsService };
export { AuthAnalyticsService } from "./auth-analytics.service.js";
