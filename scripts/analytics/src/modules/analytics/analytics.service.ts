import fs from "node:fs/promises";

import { executeCommand } from "~/libs/helpers/helpers.js";
import { type GITService } from "~/libs/modules/git-service/git-service.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { type AnalyticsScriptConfig } from "~/libs/types/types.js";

import { type analyticsApi } from "./analytics.js";
import {
	COMMIT_REGEX,
	EMPTY_LENGTH,
	FIRST_ARRAY_INDEX,
} from "./libs/constants/constants.js";
import { mergeStats } from "./libs/helpers/helpers.js";
import { type ActivityLogCreateItemRequestDto } from "./libs/types/types.js";

type Constructor = {
	analyticsApi: typeof analyticsApi;
	configPath: string;
	gitService: GITService;
};

class AnalyticsService {
	private analyticsApi: typeof analyticsApi;
	private configPath: string;
	private gitService: GITService;

	public constructor({ analyticsApi, configPath, gitService }: Constructor) {
		this.analyticsApi = analyticsApi;
		this.configPath = configPath;
		this.gitService = gitService;
	}

	private async collectStatsByRepository(
		repoPath: string,
	): Promise<ActivityLogCreateItemRequestDto[]> {
		const statsByDate = new Map<string, ActivityLogCreateItemRequestDto>();
		const shortLogResult = await executeCommand(
			this.gitService.getShortLogCommand(),
			repoPath,
		);

		let match;

		while (
			(match = COMMIT_REGEX.exec(shortLogResult.stdout.toString())) !== null
		) {
			const [, commitsNumber, commitDate, authorName, authorEmail] = match;

			if (!commitDate) {
				logger.error("Invalid data from git log.");

				continue;
			}

			let statsForCommitDate = statsByDate.get(commitDate);

			if (!statsForCommitDate) {
				statsForCommitDate = { date: commitDate, items: [] };
				statsByDate.set(commitDate, statsForCommitDate);
			}

			if (commitsNumber && authorName && authorEmail) {
				statsForCommitDate.items.push({
					authorEmail,
					authorName,
					commitsNumber: Number.parseInt(commitsNumber, 10),
				});
			} else {
				logger.error("Invalid data from git log.");
			}
		}

		return [...statsByDate.values()];
	}

	private async fetchRepository(repoPath: string): Promise<void> {
		await executeCommand(this.gitService.getFetchCommand(), repoPath);
		logger.info(`Fetched latest updates for repo at path: ${repoPath}`);
	}

	private async getConfig(): Promise<AnalyticsScriptConfig> {
		return JSON.parse(
			await fs.readFile(this.configPath, "utf8"),
		) as AnalyticsScriptConfig;
	}

	public async collectAndSendStats(): Promise<void> {
		try {
			const config = await this.getConfig();
			const { apiKey, repoPaths, userId } = config;
			const statsAll = [];

			for (const repoPath of repoPaths) {
				await this.fetchRepository(repoPath);
				statsAll.push(...(await this.collectStatsByRepository(repoPath)));
			}

			const stats = mergeStats(statsAll);

			if (
				stats[FIRST_ARRAY_INDEX] &&
				stats[FIRST_ARRAY_INDEX].items.length === EMPTY_LENGTH
			) {
				logger.info("There are no statistics for this day.");

				return;
			}

			await this.analyticsApi.sendAnalytics(apiKey, {
				items: stats,
				userId: Number(userId),
			});

			logger.info("Statistics successfully sent.");
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(
					`Error collecting or sending statistics: ${error.message}`,
				);
			} else {
				logger.error(
					`Error collecting or sending statistics: ${String(error)}`,
				);
			}
		}
	}
}

export { AnalyticsService };
