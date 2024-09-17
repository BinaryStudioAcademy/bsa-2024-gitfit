import { logger } from "~/libs/modules/logger/logger.js";
import { contributorService } from "~/modules/contributors/contributors.js";
import { gitEmailService } from "~/modules/git-emails/git-emails.js";
import { projectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";
import { ProjectModel } from "~/modules/projects/project.model.js";
import { ProjectRepository } from "~/modules/projects/project.repository.js";
import { ProjectService } from "~/modules/projects/project.service.js";

import { ActivityLogController } from "./activity-log.controller.js";
import { ActivityLogModel } from "./activity-log.model.js";
import { ActivityLogRepository } from "./activity-log.repository.js";
import { ActivityLogService } from "./activity-log.service.js";

const projectRepository = new ProjectRepository(ProjectModel);
const projectService = new ProjectService(
	projectRepository,
	projectApiKeyService,
);

const activityLogRepository = new ActivityLogRepository(ActivityLogModel);
const activityLogService = new ActivityLogService({
	activityLogRepository,
	contributorService,
	gitEmailService,
	projectApiKeyService,
	projectService,
});
const activityLogController = new ActivityLogController(
	logger,
	activityLogService,
);

export { activityLogController };
export { ActivityLogService } from "./activity-log.service.js";
