import { logger } from "~/libs/modules/logger/logger.js";
import { projectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";
import { projectService } from "~/modules/projects/projects.js";
import { userService } from "~/modules/users/users.js";

import { AuthAnalyticsController } from "./auth-analytics.controller.js";
import { AuthAnalyticsService } from "./auth-analytics.service.js";

const authAnalyticsService = new AuthAnalyticsService(
	projectApiKeyService,
	projectService,
	userService,
);
const authAnalyticsController = new AuthAnalyticsController(
	logger,
	authAnalyticsService,
);

export { authAnalyticsController };
