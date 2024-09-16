import { logger } from "~/libs/modules/logger/logger.js";

import { BaseTaskScheduler } from "./base-task-scheduler.module.js";

const taskScheduler = new BaseTaskScheduler({
	logger,
});

export { type TaskScheduler } from "./libs/types/types.js";
export { taskScheduler };
