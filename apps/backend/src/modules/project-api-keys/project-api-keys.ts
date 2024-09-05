import { logger } from "~/libs/modules/logger/logger.js";

import { ProjectApiKeyController } from "./project-api-key.controller.js";
import { ProjectApiKeyModel } from "./project-api-key.model.js";
import { ProjectApiKeyRepository } from "./project-api-key.repository.js";
import { ProjectApiKeyService } from "./project-api-key.service.js";

const projectApiKeyRepository = new ProjectApiKeyRepository(ProjectApiKeyModel);
const projectApiKeyService = new ProjectApiKeyService(projectApiKeyRepository);
const projectApiKeyController = new ProjectApiKeyController(
	logger,
	projectApiKeyService,
);

export { projectApiKeyController };
export { ProjectApiKeyService } from "./project-api-key.service.js";
