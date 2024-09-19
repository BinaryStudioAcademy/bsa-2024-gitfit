import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { activityLogController } from "~/modules/activity-logs/activity-logs.js";
import { authController } from "~/modules/auth/auth.js";
import { contributorController } from "~/modules/contributors/contributors.js";
import { groupController } from "~/modules/groups/groups.js";
import { notificationController } from "~/modules/notifications/notifications.js";
import { permissionController } from "~/modules/permissions/permissions.js";
import { projectApiKeyController } from "~/modules/project-api-keys/project-api-keys.js";
import { projectGroupController } from "~/modules/project-groups/project-groups.js";
import { projectPermissionsController } from "~/modules/project-permissions/project-permissions.js";
import {
	inactiveProjectsNotifier,
	projectController,
} from "~/modules/projects/projects.js";
import { userController, userService } from "~/modules/users/users.js";

import { taskScheduler } from "../task-scheduler/task-scheduler.js";
import { token } from "../token/token.js";
import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";
import { WHITE_ROUTES } from "./libs/constants/constants.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...activityLogController.routes,
	...authController.routes,
	...notificationController.routes,
	...permissionController.routes,
	...projectGroupController.routes,
	...projectPermissionsController.routes,
	...projectController.routes,
	...contributorController.routes,
	...userController.routes,
	...groupController.routes,
	...projectApiKeyController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	jobs: { inactiveProjectsNotifier },
	logger,
	services: { userService },
	taskScheduler,
	title: "GitFit",
	token,
	whiteRoutes: WHITE_ROUTES,
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
