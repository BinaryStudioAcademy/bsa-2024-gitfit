import { Command } from "commander";
import forever from "forever";
import path from "node:path";

import { type Logger } from "~/libs/modules/logger/logger.js";

type Constructor = {
	logger: Logger;
};

class BaseAnalyticsCli {
	private logger: Logger;

	private program: Command;

	public constructor({ logger }: Constructor) {
		this.program = new Command();
		this.logger = logger;
	}

	private setupCommands(): void {
		this.program
			.command("track <apiKey> <userId> <repoPath>")
			.description("Start the background job for collecting statistics")
			.action((repoPath: string, apiKey: string, userId: string) => {
				if (!repoPath || !apiKey || !userId) {
					this.logger.error("Not all command arguments were provided.");

					return;
				}

				const scriptPath = path.resolve(
					process.cwd(),
					"src",
					"libs",
					"modules",
					"analytics-cli",
					"init-analytics-cli.js",
				);
				forever.startDaemon(scriptPath, {
					args: [repoPath, apiKey, userId],
					errFile: "analytics-errors.log",
					outFile: "analytics-output.log",
					silent: false,
				});

				this.logger.info("Started background job for collecting analytics.");
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
