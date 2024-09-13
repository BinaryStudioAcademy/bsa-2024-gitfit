import { exec } from "node:child_process";
import { promisify } from "node:util";

import { config } from "../../libs/modules/config/config.js";
import { logger } from "../../libs/modules/logger/logger.js";
import { COMMIT_REGEX } from "./libs/constants/constants.js";
import {
	formatDate,
	getFetch,
	getShortLogCmd,
} from "./libs/helpers/helpers.js";
import {
	type ActivityLogCreateItemRequestDto,
	type CommitStatistics,
	type ScriptParameters,
} from "./libs/types/types.js";

const execAsync = promisify(exec);

async function collectAndSendStats({
	apiKey,
	repoPath,
	userId,
}: ScriptParameters): Promise<void> {
	try {
		await execAsync(getFetch(repoPath));
		const stats = await collectStatsByRepository(repoPath);

		const response = await fetch(config.ENV.APP.BACKEND_ROUTE, {
			body: JSON.stringify({
				items: stats,
				userId,
			}),
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok.");
		}

		logger.info("Statistics successfully sent.");
	} catch (error: unknown) {
		if (error instanceof Error) {
			logger.error(`Error collecting or sending statistics: ${error.message}`);
		} else {
			logger.error(`Error collecting or sending statistics: ${String(error)}`);
		}
	}
}

async function collectStatsByRepository(
	repoPath: string,
): Promise<ActivityLogCreateItemRequestDto[]> {
	const stats = [];
	const shortLogResult = await execAsync(getShortLogCmd("midnight"), {
		cwd: repoPath,
	});

	let match;
	const commitItems: CommitStatistics[] = [];

	while ((match = COMMIT_REGEX.exec(shortLogResult.stdout)) !== null) {
		const [, commitsNumber, authorName, authorEmail] = match;

		if (commitsNumber && authorName && authorEmail) {
			commitItems.push({
				authorEmail,
				authorName,
				commitsNumber: Number.parseInt(commitsNumber, 10),
			});
		} else {
			logger.error("Invalid data from git log.");
		}
	}

	stats.push({
		date: formatDate(new Date()),
		items: commitItems,
	});

	return stats;
}

export { collectAndSendStats };
