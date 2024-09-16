import { encryption } from "~/libs/modules/encryption/encryption.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encryption);
const userController = new UserController(logger, userService);

export { userController, userService };
export { UserError } from "./libs/exceptions/exceptions.js";
export {
	type UserAuthResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";
export {
	userPatchValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { UserModel } from "./user.model.js";
export { UserRepository } from "./user.repository.js";
export { UserService } from "./user.service.js";
