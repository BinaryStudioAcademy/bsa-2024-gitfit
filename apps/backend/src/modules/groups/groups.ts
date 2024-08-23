import { logger } from "~/libs/modules/logger/logger.js";

import { GroupController } from "./group.controller.js";
import { GroupService } from "./group.service.js";

const groupService = new GroupService();
const groupController = new GroupController(logger, groupService);

export { groupController };
export { groupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
