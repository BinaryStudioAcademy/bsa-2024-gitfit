import { type Command } from "commander";
import forever from "forever";
import path from "node:path";

// TODO: redo to avoid linter errors about unused files
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { runScript } from "./scheduler.js";

function setupCommands(program: Command): void {
	program
		.command("run-forever <repoPath> <apiKey> <userId>")
		.description("Start the background job for collecting statistics")
		.action((repoPath: string, apiKey: string, userId: string) => {
			if (!repoPath || !apiKey || !userId) {
				return;
			}

			const scriptPath = path.resolve(import.meta.dirname, "scheduler.js");
			forever.startDaemon(scriptPath, {
				args: [repoPath, apiKey, userId],
				errFile: "analytics-errors.log",
				outFile: "analytics-output.log",
				silent: false,
			});
		});
}

export { setupCommands };
