import cron from "node-cron";

import {
	ARGUMENT_START_INDEX,
	CRON_SCHEDULE,
} from "./libs/constants/constants.js";
import { type ScriptParameters } from "./libs/types/types.js";
import { collectAndSendStats } from "./script.js";

const [repoPath, apiKey, userId] = process.argv.slice(ARGUMENT_START_INDEX) as [
	string,
	string,
	string,
];

function runScript({ apiKey, repoPath, userId }: ScriptParameters): void {
	cron.schedule(CRON_SCHEDULE, () => {
		void collectAndSendStats({ apiKey, repoPath, userId });
	});
}

runScript({ apiKey, repoPath, userId });

export { runScript };
