import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { PermissionController } from "./permission.controller.js";
import { PermissionModel } from "./permission.model.js";
import { PermissionRepository } from "./permission.repository.js";
import { PermissionService } from "./permission.service.js";

const permissionRepository = new PermissionRepository(PermissionModel);
const permissionService = new PermissionService(
	permissionRepository,
	userService,
);
const permissionController = new PermissionController(
	logger,
	permissionService,
);

export { permissionController };
