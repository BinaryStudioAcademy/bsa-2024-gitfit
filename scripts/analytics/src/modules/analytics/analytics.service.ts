import { executeCommand, formatDate } from "~/libs/helpers/helpers.js";
import { type GITService } from "~/libs/modules/git-service/git-service.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { type analyticsApi } from "./analytics.js";
import {
	COMMIT_REGEX,
	EMPTY_LENGTH,
	FIRST_ARRAY_INDEX,
} from "./libs/constants/constants.js";
import {
	type ActivityLogCreateItemRequestDto,
	type CommitStatistics,
} from "./libs/types/types.js";

type Constructor = {
	analyticsApi: typeof analyticsApi;
	apiKey: string;
	gitService: GITService;
	repoPath: string;
	userId: string;
};

class AnalyticsService {
	private analyticsApi: typeof analyticsApi;
	private apiKey: string;
	private gitService: GITService;
	private repoPath: string;
	private userId: string;

	public constructor({
		analyticsApi,
		apiKey,
		gitService,
		repoPath,
		userId,
	}: Constructor) {
		this.analyticsApi = analyticsApi;
		this.apiKey = apiKey;
		this.gitService = gitService;
		this.repoPath = repoPath;
		this.userId = userId;
	}

	private async collectStatsByRepository(): Promise<
		ActivityLogCreateItemRequestDto[]
	> {
		const stats: ActivityLogCreateItemRequestDto[] = [];
		const shortLogResult = await executeCommand(
			this.gitService.getShortLogCommand(this.repoPath, "midnight"),
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

	private async fetchRepository(): Promise<void> {
		await executeCommand(this.gitService.getFetchCommand(this.repoPath));
		logger.info(`Fetched latest updates for repo at path: ${this.repoPath}`);
	}

	public async collectAndSendStats(): Promise<void> {
		try {
			await this.fetchRepository();
			const stats = await this.collectStatsByRepository();

			if (
				stats[FIRST_ARRAY_INDEX] &&
				stats[FIRST_ARRAY_INDEX].items.length === EMPTY_LENGTH
			) {
				logger.info("There are no statistics for this day.");

				return;
			}

			await this.analyticsApi.sendAnalytics(this.apiKey, {
				items: stats,
				userId: Number(this.userId),
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
