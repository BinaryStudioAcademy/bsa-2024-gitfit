import { encryption } from "~/libs/modules/encryption/encryption.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { token } from "~/libs/modules/token/token.js";
import { userService } from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService(userService, token, encryption);
const authController = new AuthController(logger, authService);

export { authController };
export { AuthError } from "./libs/exceptions/exceptions.js";
