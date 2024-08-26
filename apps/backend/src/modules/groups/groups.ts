import { logger } from "~/libs/modules/logger/logger.js";

import { GroupController } from "./group.controller.js";
import { GroupRepository } from "./group.repository.js";
import { GroupService } from "./group.service.js";
import { UserGroupModel } from "./user-group.model.js";

const groupRepository = new GroupRepository(UserGroupModel);
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(logger, groupService);

export { groupController };
export { groupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
