import { logger } from "~/libs/modules/logger/logger.js";
import { taskScheduler } from "~/libs/modules/task-scheduler/task-scheduler.js";
import { projectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";

import { notificationService } from "../notifications/notifications.js";
import { userService } from "../users/users.js";
import { InactiveProjectsNotifier } from "./inactive-project-notifier.js";
import { NOTIFICATION_CRON_SCHEDULE } from "./libs/constants/constants.js";
import { ProjectController } from "./project.controller.js";
import { ProjectModel } from "./project.model.js";
import { ProjectRepository } from "./project.repository.js";
import { ProjectService } from "./project.service.js";

const projectRepository = new ProjectRepository(ProjectModel);
const projectService = new ProjectService(
	projectRepository,
	projectApiKeyService,
);
const projectController = new ProjectController(logger, projectService);

const inactiveProjectsNotifier = new InactiveProjectsNotifier({
	logger,
	notificationService,
	projectService,
	userService,
});

taskScheduler.start(
	NOTIFICATION_CRON_SCHEDULE,
	() => void inactiveProjectsNotifier.processInactiveProjects(),
);

export { projectController, projectService };
