import { config } from "../config/config.js";
import { BaseEncryption } from "./base-encryption.module.js";

const encryption = new BaseEncryption(config);

export { encryption };
export { type Encryption } from "./libs/types/types.js";
