import { authAnalyticsService } from "~/modules/auth-analytics/auth-analytics.js";

import { logger } from "../logger/logger.js";
import { BaseAnalyticsCli } from "./base-analytics-cli.js";

const analyticsCli = new BaseAnalyticsCli({
	authAnalyticsService,
	logger,
});

export { analyticsCli };
