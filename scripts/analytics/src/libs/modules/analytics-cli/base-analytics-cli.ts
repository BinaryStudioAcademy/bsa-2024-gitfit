import { Command } from "commander";
import path from "node:path";
import pm2 from "pm2";

import { executeCommand } from "~/libs/helpers/helpers.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
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
			const { stderr: saveError, stdout: saveOut } =
				await executeCommand("pm2 save");

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
			.command("track <apiKey> <userId> <repoPath>")
			.description("Start the background job for collecting statistics")
			.action(async (apiKey: string, userId: string, repoPath: string) => {
				if (!apiKey || !userId || !repoPath) {
					this.logger.error("Not all command arguments are provided.");

					return;
				}

				const project = await this.authAnalyticsService.validateCredentials(
					apiKey,
					Number(userId),
				);

				if (!project) {
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
							args: [apiKey, userId, repoPath],
							autorestart: false,
							error: `${project.projectName}-err.log`,
							name: project.projectName,
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
