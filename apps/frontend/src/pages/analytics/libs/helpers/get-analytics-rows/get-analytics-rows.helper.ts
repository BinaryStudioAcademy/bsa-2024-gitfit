import { formatDate } from "~/libs/helpers/helpers.js";
import { type ActivityLogGetAllItemResponseDto } from "~/modules/activity-logs/activity-logs.js";

import { type AnalyticsRow } from "../../types/types.js";

const getAnalyticsRows = (
	activityLogs: ActivityLogGetAllItemResponseDto[],
	dateRange: string[],
): AnalyticsRow[] => {
	const contributorMap: Record<string, Record<string, number>> = {};

	for (const log of activityLogs) {
		const { commitsNumber, date, gitEmail } = log;
		const { id, name } = gitEmail.contributor;

		const uniqueKey = `${name}_${String(id)}`;

		const formattedDate = formatDate(new Date(date), "MMM d");

		contributorMap[uniqueKey] = contributorMap[uniqueKey] || {};

		const DEFAULT_COMMIT_COUNT = 0;
		contributorMap[uniqueKey][formattedDate] =
			(contributorMap[uniqueKey][formattedDate] || DEFAULT_COMMIT_COUNT) +
			commitsNumber;
	}

	return Object.entries(contributorMap).map(([uniqueKey, commitsByDate]) => {
		const [contributorName, contributorId] = uniqueKey.split("_");
		const row: Record<string, unknown> = { contributorId, contributorName };

		for (const date of dateRange) {
			row[`commitsNumber_${date}`] = {
				commitsNumber: commitsByDate[date] ?? "-",
				id: `${uniqueKey}_${date}`,
			};
		}

		return row as AnalyticsRow;
	});
};

export { getAnalyticsRows };
