import { config } from "../config/config.js";
import { TokenService } from "./token.service.js";

const token = new TokenService({
	algorithm: config.ENV.JWT.ALGORITHM,
	expirationTime: config.ENV.JWT.EXPIRATION_TIME,
	secret: config.ENV.JWT.SECRET,
});

export { token };
export { type Token } from "./libs/types/types.js";
