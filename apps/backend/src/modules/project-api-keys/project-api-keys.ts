import { encryption } from "~/libs/modules/encryption/encryption.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { projectApiKey } from "~/libs/modules/token/token.js";
import { ProjectModel } from "~/modules/projects/project.model.js";
import { ProjectRepository } from "~/modules/projects/project.repository.js";
import { userService } from "~/modules/users/users.js";

import { ProjectApiKeyController } from "./project-api-key.controller.js";
import { ProjectApiKeyModel } from "./project-api-key.model.js";
import { ProjectApiKeyRepository } from "./project-api-key.repository.js";
import { ProjectApiKeyService } from "./project-api-key.service.js";

const projectRepository = new ProjectRepository(ProjectModel);
const projectApiKeyRepository = new ProjectApiKeyRepository(ProjectApiKeyModel);
const projectApiKeyService = new ProjectApiKeyService({
	encryption,
	projectApiKeyRepository,
	projectRepository,
	token: projectApiKey,
	userService,
});
const projectApiKeyController = new ProjectApiKeyController(
	logger,
	projectApiKeyService,
);

export { projectApiKeyController, projectApiKeyService };
export { ProjectApiKeyService } from "./project-api-key.service.js";
