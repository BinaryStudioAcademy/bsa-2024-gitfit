import { logger } from "~/libs/modules/logger/logger.js";
import { projectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";
import { projectGroupService } from "~/modules/project-groups/project-groups.js";

import { notificationService } from "../notifications/notifications.js";
import { userService } from "../users/users.js";
import { ProjectController } from "./project.controller.js";
import { ProjectModel } from "./project.model.js";
import { ProjectRepository } from "./project.repository.js";
import { ProjectService } from "./project.service.js";

const projectRepository = new ProjectRepository(ProjectModel);
const projectService = new ProjectService({
	logger,
	notificationService,
	projectApiKeyService,
	projectGroupService,
	projectRepository,
	userService,
});
const projectController = new ProjectController(
	logger,
	projectGroupService,
	projectService,
);

export { projectController, projectService };
export { type ProjectService } from "./project.service.js";
