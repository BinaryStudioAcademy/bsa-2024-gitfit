import { config } from "../config/config.js";
import { BaseEncryption } from "./base-encryption.module.js";

const encryption = new BaseEncryption(config.ENV.ENCRYPTION.SALT_ROUNDS);

export { encryption };
export { type BaseEncryption } from "./base-encryption.module.js";
