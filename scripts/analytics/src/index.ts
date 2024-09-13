import { Command } from "commander";

import { setupCommands } from "./modules/cli/cli.js";

const program = new Command();

program
	.name("CLI Analytics")
	.description("CLI tool to collect repositories data and send analytics")
	.version("1.0.0");

setupCommands(program);

program.parse(process.argv);
