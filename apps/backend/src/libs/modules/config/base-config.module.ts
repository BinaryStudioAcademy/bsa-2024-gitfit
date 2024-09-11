import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

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
				ENVIRONMENT: {
					default: null,
					doc: "Application environment",
					env: "NODE_ENV",
					format: Object.values(AppEnvironment),
				},
				HOST: {
					default: null,
					doc: "Host for server app",
					env: "HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Port for incoming connections",
					env: "PORT",
					format: Number,
				},
			},
			DB: {
				CONNECTION_STRING: {
					default: null,
					doc: "Database connection string",
					env: "DB_CONNECTION_STRING",
					format: String,
				},
				DIALECT: {
					default: null,
					doc: "Database dialect",
					env: "DB_DIALECT",
					format: String,
				},
				POOL_MAX: {
					default: null,
					doc: "Database pool max count",
					env: "DB_POOL_MAX",
					format: Number,
				},
				POOL_MIN: {
					default: null,
					doc: "Database pool min count",
					env: "DB_POOL_MIN",
					format: Number,
				},
			},
			ENCRYPTION: {
				ALGORITHM: {
					default: null,
					doc: "Data encryption algorithm",
					env: "ENCRYPTION_ALGORITHM",
					format: String,
				},
				SALT_ROUNDS: {
					default: null,
					doc: "Data encryption salt rounds",
					env: "ENCRYPTION_SALT_ROUNDS",
					format: Number,
				},
				SECRET: {
					default: null,
					doc: "Data encryption secret",
					env: "ENCRYPTION_SECRET",
					format: String,
				},
			},
			JWT: {
				ALGORITHM: {
					default: null,
					doc: "JWT encryption algorithm",
					env: "JWT_ALGORITHM",
					format: String,
				},
				EXPIRATION_TIME: {
					default: null,
					doc: "JWT expiration time",
					env: "JWT_EXPIRATION_TIME",
					format: String,
				},
				SECRET: {
					default: null,
					doc: "JWT secret",
					env: "JWT_SECRET",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
