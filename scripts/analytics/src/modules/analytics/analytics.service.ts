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
	repoPaths: string[];
	userId: string;
};

class AnalyticsService {
	private analyticsApi: typeof analyticsApi;
	private apiKey: string;
	private gitService: GITService;
	private repoPaths: string[];
	private userId: string;

	public constructor({
		analyticsApi,
		apiKey,
		gitService,
		repoPaths,
		userId,
	}: Constructor) {
		this.analyticsApi = analyticsApi;
		this.apiKey = apiKey;
		this.gitService = gitService;
		this.repoPaths = repoPaths;
		this.userId = userId;
	}

	private async collectStatsByRepository(
		repoPath: string,
	): Promise<ActivityLogCreateItemRequestDto[]> {
		const stats: ActivityLogCreateItemRequestDto[] = [];
		const shortLogResult = await executeCommand(
			this.gitService.getShortLogCommand(repoPath, "midnight"),
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
		await executeCommand(this.gitService.getFetchCommand(repoPath));
		logger.info(`Fetched latest updates for repo at path: ${repoPath}`);
	}

	public async collectAndSendStats(): Promise<void> {
		try {
			const statsAll = [];

			for (const repoPath of this.repoPaths) {
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

function mergeStats(
	statsAll: ActivityLogCreateItemRequestDto[],
): ActivityLogCreateItemRequestDto[] {
	return mergeByCriteria(
		statsAll,
		(item1, item2) => item1.date === item2.date,
		(mergedItem, item) =>
			(mergedItem.items = mergeStatsItems([
				...mergedItem.items,
				...item.items,
			])),
	);
}

function mergeStatsItems(items: CommitStatistics[]): CommitStatistics[] {
	return mergeByCriteria(
		items,
		(item1, item2) =>
			item1.authorEmail === item2.authorEmail &&
			item1.authorName === item2.authorName,
		(mergedItem, item) => (mergedItem.commitsNumber += item.commitsNumber),
	);
}

function mergeByCriteria<T>(
	items: T[],
	compareFunction: (item1: T, item2: T) => boolean,
	mergeFunction: (mergedItem: T, item: T) => void,
): T[] {
	const mergedItems: T[] = [];

	for (const item of items) {
		const mergedItem = mergedItems.find((mergedItem) =>
			compareFunction(mergedItem, item),
		);

		if (mergedItem) {
			mergeFunction(mergedItem, item);
		} else {
			mergedItems.push(item);
		}
	}

	return mergedItems;
}

export { AnalyticsService };
