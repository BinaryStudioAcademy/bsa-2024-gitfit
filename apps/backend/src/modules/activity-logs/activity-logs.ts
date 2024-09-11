import { logger } from "~/libs/modules/logger/logger.js";
import { contributorService } from "~/modules/contributors/contributors.js";
import { gitEmailService } from "~/modules/git-emails/git-emails.js";

import { ActivityLogController } from "./activity-log.controller.js";
import { ActivityLogModel } from "./activity-log.model.js";
import { ActivityLogRepository } from "./activity-log.repository.js";
import { ActivityLogService } from "./activity-log.service.js";

const activityLogRepository = new ActivityLogRepository(ActivityLogModel);
const activityLogService = new ActivityLogService(
	activityLogRepository,
	contributorService,
	gitEmailService,
);
const activityLogController = new ActivityLogController(
	logger,
	activityLogService,
);

export { activityLogController };
export { ActivityLogService } from "./activity-log.service.js";
