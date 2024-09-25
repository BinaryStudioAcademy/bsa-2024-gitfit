import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";

import { type AnalyticsRow } from "../../types/types.js";

const getAnalyticsRows = (
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[],
): AnalyticsRow[] => {
	return activityLogs.map((log) => ({
		commitsNumber: log.commitsNumber,
		contributorId: log.contributor.id,
		contributorName: log.contributor.name,
	}));
};

export { getAnalyticsRows };
