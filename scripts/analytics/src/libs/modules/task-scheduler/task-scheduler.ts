import { logger } from "~/libs/modules/logger/logger.js";

import { BaseTaskScheduler } from "./base-task-scheduler.module.js";
import { CRON_SCHEDULE } from "./libs/constants/constants.js";

const taskScheduler = new BaseTaskScheduler({
	logger,
	schedule: CRON_SCHEDULE,
});

export { type TaskScheduler } from "./libs/types/types.js";
export { taskScheduler };
