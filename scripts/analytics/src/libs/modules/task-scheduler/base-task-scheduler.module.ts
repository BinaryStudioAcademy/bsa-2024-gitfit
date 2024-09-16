import cron from "node-cron";

import { type Logger } from "~/libs/modules/logger/logger.js";

import { type TaskScheduler } from "./libs/types/types.js";

type Constructor = {
	logger: Logger;
	schedule: string;
};

class BaseTaskScheduler implements TaskScheduler {
	private logger: Logger;

	private schedule: string;

	public constructor({ logger, schedule }: Constructor) {
		this.logger = logger;
		this.schedule = schedule;
	}

	public start(task: () => void): void {
		cron.schedule(this.schedule, () => {
			task();
		});
		this.logger.info(`TaskScheduler started with schedule: ${this.schedule}`);
	}
}

export { BaseTaskScheduler };
