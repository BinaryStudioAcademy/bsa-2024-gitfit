import { config } from "../config/config.js";
import { BaseToken } from "./base-token.module.js";

const token = new BaseToken({
	algorithm: config.ENV.JWT.ALGORITHM,
	expirationTime: config.ENV.JWT.EXPIRATION_TIME,
	secret: config.ENV.JWT.SECRET,
});

const permanentToken = new BaseToken({
	algorithm: config.ENV.JWT.ALGORITHM,
	expirationTime: "",
	secret: config.ENV.JWT.SECRET,
});

export { permanentToken, token };
export { type Token } from "./libs/types/types.js";
