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
				BACKEND_ROUTE: {
					default: null,
					doc: "Route for sending statistics",
					env: "BACKEND_ROUTE",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
