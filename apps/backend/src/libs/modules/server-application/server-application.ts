import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
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
	...projectGroupController.routes,
	...projectController.routes,
	...userController.routes,
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
