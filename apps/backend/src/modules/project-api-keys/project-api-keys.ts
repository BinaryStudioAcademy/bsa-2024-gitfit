import { logger } from "~/libs/modules/logger/logger.js";
import { ProjectModel } from "~/modules/projects/project.model.js";
import { ProjectRepository } from "~/modules/projects/project.repository.js";
import { userRepository } from "~/modules/users/users.js";

import { ProjectApiKeyController } from "./project-api-key.controller.js";
import { ProjectApiKeyModel } from "./project-api-key.model.js";
import { ProjectApiKeyRepository } from "./project-api-key.repository.js";
import { ProjectApiKeyService } from "./project-api-key.service.js";

const projectRepository = new ProjectRepository(ProjectModel);
const projectApiKeyRepository = new ProjectApiKeyRepository(ProjectApiKeyModel);
const projectApiKeyService = new ProjectApiKeyService(
	projectApiKeyRepository,
	projectRepository,
	userRepository,
);
const projectApiKeyController = new ProjectApiKeyController(
	logger,
	projectApiKeyService,
);

export { projectApiKeyController, projectApiKeyService };
export { ProjectApiKeyService } from "./project-api-key.service.js";
