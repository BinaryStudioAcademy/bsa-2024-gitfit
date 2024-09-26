import { logger } from "~/libs/modules/logger/logger.js";

import { ProjectGroupController } from "./project-group.controller.js";
import { ProjectGroupModel } from "./project-group.model.js";
import { ProjectGroupRepository } from "./project-group.repository.js";
import { ProjectGroupService } from "./project-group.service.js";

const projectGroupRepository = new ProjectGroupRepository(ProjectGroupModel);
const projectGroupService = new ProjectGroupService(projectGroupRepository);
const projectGroupController = new ProjectGroupController(
	logger,
	projectGroupService,
);

export { projectGroupController, projectGroupService };
export { ProjectGroupService } from "./project-group.service.js";
