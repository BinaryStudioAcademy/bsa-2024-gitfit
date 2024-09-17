import { logger } from "../logger/logger.js";
import { BaseAnalyticsCli } from "./base-analytics-cli.js";

const analyticsCli = new BaseAnalyticsCli({
	logger,
});

export { analyticsCli };
export { getPackageName } from "./init-analytics-cli.js";
