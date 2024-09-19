import cron from "node-cron";

import { type Logger } from "~/libs/modules/logger/logger.js";

import { type TaskScheduler } from "./libs/types/types.js";

type Constructor = {
	logger: Logger;
};

class BaseTaskScheduler implements TaskScheduler {
	private logger: Logger;

	public constructor({ logger }: Constructor) {
		this.logger = logger;
	}

	public start(schedule: string, task: () => void): void {
		cron.schedule(schedule, () => {
			task();
		});
		this.logger.info(
			`Task is scheduled to run according to the pattern: ${schedule}.`,
		);
	}
}

export { BaseTaskScheduler };
