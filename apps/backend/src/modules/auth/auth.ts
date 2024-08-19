import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { TokenService } from "./token/token.service.js";

const tokenService = new TokenService("secret");
const authService = new AuthService(userService, tokenService);
const authController = new AuthController(logger, authService);

export { authController };
