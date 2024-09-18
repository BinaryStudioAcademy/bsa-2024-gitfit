import convict, { type Config as LibraryConfig } from "convict";

import { type Logger } from "../logger/logger.js";
import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	private logger: Logger;

	public ENV: EnvironmentSchema;

	public constructor(logger: Logger) {
		this.logger = logger;

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();

		this.logger.info("Config is successfully parsed.");
	}

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				API_ORIGIN_URL: {
					default: "/api/v1",
					doc: "URL of origin api",
					format: String,
				},
				SERVER_URL: {
					default: "http://localhost:3001",
					doc: "URL of server",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
