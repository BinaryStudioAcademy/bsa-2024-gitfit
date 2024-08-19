import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { TokenService } from "../../libs/modules/token/token.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const tokenService = new TokenService(
	config.ENV.JWT.SECRET,
	config.ENV.JWT.EXPIRATION_TIME,
	config.ENV.JWT.ALGORITHM,
);
const authService = new AuthService(userService, tokenService);
const authController = new AuthController(logger, authService);

export { authController };
