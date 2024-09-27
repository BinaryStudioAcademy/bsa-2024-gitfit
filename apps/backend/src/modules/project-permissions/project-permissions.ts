import { logger } from "~/libs/modules/logger/logger.js";

import { ProjectPermissionsController } from "./project-permissions.controller.js";
import { ProjectPermissionModel } from "./project-permissions.model.js";
import { ProjectPermissionRepository } from "./project-permissions.repository.js";
import { ProjectPermissionService } from "./project-permissions.service.js";

const projectPermissionRepository = new ProjectPermissionRepository(
	ProjectPermissionModel,
);
const projectPermissionService = new ProjectPermissionService(
	projectPermissionRepository,
);
const projectPermissionsController = new ProjectPermissionsController(
	logger,
	projectPermissionService,
);

export { projectPermissionsController };
export { ProjectPermissionModel } from "./project-permissions.model.js";
