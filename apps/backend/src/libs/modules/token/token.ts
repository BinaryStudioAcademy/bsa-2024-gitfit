import { config } from "../config/config.js";
import { TokenService } from "./token.service.js";

const token = new TokenService(
	config.ENV.JWT.SECRET,
	config.ENV.JWT.EXPIRATION_TIME,
	config.ENV.JWT.ALGORITHM,
);

export { token };
export { type Token } from "./libs/types/types.js";
