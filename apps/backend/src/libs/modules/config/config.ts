import { logger } from "~/libs/modules/logger/logger.js";

import { BaseConfig } from "./base-config.module.js";

const config = new BaseConfig(logger);

export { config };
export { type Config } from "./libs/types/types.js";
