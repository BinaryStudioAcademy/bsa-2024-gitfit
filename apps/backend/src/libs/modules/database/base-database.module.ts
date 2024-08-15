import knex, { type Knex } from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { DatabaseTableName } from "./libs/enums/enums.js";
import { type Database } from "./libs/types/types.js";

class BaseDatabase implements Database {
	private appConfig: Config;

	private logger: Logger;

	public constructor(config: Config, logger: Logger) {
		this.appConfig = config;
		this.logger = logger;
	}

	private get environmentConfig(): Knex.Config {
		return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
	}

	private get initialConfig(): Knex.Config {
		const sslConfig =
			this.appConfig.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL
				? {}
				: { ssl: { rejectUnauthorized: false } };

		return {
			client: this.appConfig.ENV.DB.DIALECT,
			connection: {
				connectionString: this.appConfig.ENV.DB.CONNECTION_STRING,
				...sslConfig,
			},
			debug: false,
			migrations: {
				directory: "src/db/migrations",
				tableName: DatabaseTableName.MIGRATIONS,
			},
			pool: {
				max: this.appConfig.ENV.DB.POOL_MAX,
				min: this.appConfig.ENV.DB.POOL_MIN,
			},
			...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
		};
	}

	public connect(): ReturnType<Database["connect"]> {
		this.logger.info("Establishing DB connection...");

		Model.knex(knex.default(this.environmentConfig));
	}

	public get environmentsConfig(): Database["environmentsConfig"] {
		return {
			[AppEnvironment.DEVELOPMENT]: this.initialConfig,
			[AppEnvironment.LOCAL]: this.initialConfig,
			[AppEnvironment.PRODUCTION]: this.initialConfig,
		};
	}
}

export { BaseDatabase };
