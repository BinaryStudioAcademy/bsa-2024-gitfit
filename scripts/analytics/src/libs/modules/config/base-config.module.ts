import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { type Logger } from "../logger/logger.js";
import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	private logger: Logger;

	public ENV: EnvironmentSchema;

	public constructor(logger: Logger) {
		this.logger = logger;

		config();

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();
		this.logger.info(".env file is found and successfully parsed.");
	}

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				API_ORIGIN_URL: {
					default: null,
					doc: "URL of origin api",
					env: "APP_API_ORIGIN_URL",
					format: String,
				},
				SERVER_URL: {
					default: null,
					doc: "URL of server",
					env: "APP_SERVER_URL",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
