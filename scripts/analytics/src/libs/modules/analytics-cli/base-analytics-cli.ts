import { EMPTY_LENGTH } from "@git-fit/shared";
import { Command } from "commander";
import fs from "node:fs/promises";
import path from "node:path";
import pm2 from "pm2";

import { executeCommand } from "~/libs/helpers/helpers.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type AnalyticsScriptConfig } from "~/libs/types/types.js";
import { type AuthAnalyticsService } from "~/modules/auth-analytics/auth-analytics.js";

type Constructor = {
	authAnalyticsService: AuthAnalyticsService;
	logger: Logger;
};

class BaseAnalyticsCli {
	private authAnalyticsService: AuthAnalyticsService;

	private logger: Logger;

	private program: Command;

	public constructor({ authAnalyticsService, logger }: Constructor) {
		this.authAnalyticsService = authAnalyticsService;
		this.program = new Command();
		this.logger = logger;
	}

	private async setupAutoStart(): Promise<void> {
		try {
			const { stderr: saveError, stdout: saveOut } = await executeCommand(
				"pm2 save",
				process.cwd(),
			);

			if (saveError) {
				this.logger.error(`PM2 save error: ${saveError as string}`);

				return;
			}

			this.logger.info(`PM2 save successful: ${saveOut as string}`);
		} catch (error) {
			this.logger.error("Error setting up auto-start:", {
				message: (error as Error).message,
				stack: (error as Error).stack,
			});
		}
	}

	private setupCommands(): void {
		this.program
			.command("track <configPath>")
			.description("Start the background job for collecting statistics")
			.action(async (configPath: string) => {
				if (!configPath) {
					this.logger.error("Configuration path is not provided.");

					return;
				}

				const config = JSON.parse(
					await fs.readFile(configPath, "utf8"),
				) as AnalyticsScriptConfig;
				const { apiKey, repoPaths, userId } = config;

				if (!apiKey || !userId || repoPaths.length === EMPTY_LENGTH) {
					this.logger.error("Configuration is not full.");

					return;
				}

				const project = await this.authAnalyticsService.validateCredentials(
					apiKey,
					Number(userId),
				);

				if (!project) {
					this.logger.error("API key is not valid.");

					return;
				}

				const scriptPath = path.resolve(
					import.meta.dirname,
					"init-analytics-cli.js",
				);
				pm2.connect((error: Error | null) => {
					if (error !== null) {
						this.logger.error("PM2 connection error:", {
							message: error.message,
							stack: error.stack,
						});

						return;
					}

					pm2.start(
						{
							args: [configPath],
							autorestart: false,
							error: `${project.projectName}-err.log`,
							name: `GitFit - ${project.projectName}`,
							output: `${project.projectName}-out.log`,
							script: scriptPath,
						},
						(startError: Error | null) => {
							if (startError !== null) {
								this.logger.error("PM2 start error:", {
									message: startError.message,
									stack: startError.stack,
								});
								pm2.disconnect();

								return;
							}

							void this.setupAutoStart();

							pm2.disconnect();
						},
					);
				});

				this.logger.info(
					`Started background job for collecting analytics for ${project.projectName}.`,
				);
			});
	}

	public init(): void {
		this.logger.info("Initializing Analytics CLI...");

		this.program
			.name("CLI Analytics")
			.description("CLI tool to collect repositories data and send analytics.")
			.version("1.0.0");

		this.setupCommands();

		this.program.parse(process.argv);

		this.logger.info("Analytics CLI started.");
	}
}

export { BaseAnalyticsCli };
