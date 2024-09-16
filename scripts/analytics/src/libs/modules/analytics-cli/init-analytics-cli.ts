import {
	analyticsApi,
	AnalyticsService,
} from "~/modules/analytics/analytics.js";

import { gitService } from "../git-service/git-service.js";
import { taskScheduler } from "../task-scheduler/task-scheduler.js";
import { ARGUMENT_START_INDEX } from "./libs/constants/constants.js";

const [repoPath, apiKey, userId] = process.argv.slice(ARGUMENT_START_INDEX) as [
	string,
	string,
	string,
];

const analyticsService = new AnalyticsService({
	analyticsApi,
	apiKey,
	gitService,
	repoPath,
	userId,
});

taskScheduler.start(() => void analyticsService.collectAndSendStats());

const getPackageName = (): string => "CLI Analytics";

export { getPackageName };
