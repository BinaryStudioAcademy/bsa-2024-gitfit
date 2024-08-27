import { logger } from "~/libs/modules/logger/logger.js";

import { GroupController } from "./group.controller.js";
import { GroupModel } from "./group.model.js";
import { GroupRepository } from "./group.repository.js";
import { GroupService } from "./group.service.js";

const groupRepository = new GroupRepository(GroupModel);
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(logger, groupService);

export { groupController };
export { groupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
