import fs from "node:fs/promises";

import { executeCommand, formatDate } from "~/libs/helpers/helpers.js";
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
import {
	type ActivityLogCreateItemRequestDto,
	type CommitStatistics,
} from "./libs/types/types.js";

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
		const stats: ActivityLogCreateItemRequestDto[] = [];
		const shortLogResult = await executeCommand(
			this.gitService.getShortLogCommand("midnight"),
			repoPath,
		);

		const commitItems: CommitStatistics[] = [];
		let match;

		while (
			(match = COMMIT_REGEX.exec(shortLogResult.stdout.toString())) !== null
		) {
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
			date: formatDate(new Date(), "yyyy-MM-dd"),
			items: commitItems,
		});

		return stats;
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
