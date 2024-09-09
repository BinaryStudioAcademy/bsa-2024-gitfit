import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { groupController } from "~/modules/groups/groups.js";
import { permissionController } from "~/modules/permissions/permissions.js";
import { projectApiKeyController } from "~/modules/project-api-keys/project-api-keys.js";
import { projectGroupController } from "~/modules/project-groups/project-groups.js";
import { projectController } from "~/modules/projects/projects.js";
import { userController, userService } from "~/modules/users/users.js";

import { token } from "../token/token.js";
import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";
import { WHITE_ROUTES } from "./libs/constants/constants.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...permissionController.routes,
	...projectGroupController.routes,
	...projectController.routes,
	...userController.routes,
	...groupController.routes,
	...projectApiKeyController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	services: { userService },
	title: "GitFit",
	token,
	whiteRoutes: WHITE_ROUTES,
});

export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
export { serverApplication };
