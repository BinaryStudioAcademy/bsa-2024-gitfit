import { logger } from "~/libs/modules/logger/logger.js";
import { projectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";

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

export { projectController, projectService };
export { ProjectService } from "./project.service.js";
