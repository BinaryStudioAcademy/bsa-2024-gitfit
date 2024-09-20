import { Table } from "~/libs/components/components.js";
import { getDateRange } from "~/libs/helpers/helpers.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";

import {
	getAnalyticsColumns,
	getAnalyticsRows,
} from "../../helpers/helpers.js";
import { type AnalyticsRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[];
	dateRange: [Date, Date];
	search: string;
};

const AnalyticsTable = ({
	activityLogs,
	dateRange,
	search,
}: Properties): JSX.Element => {
	const [startDate, endDate] = dateRange;
	const dateRangeFormatted = getDateRange(startDate, endDate);

	const analyticsColumns = getAnalyticsColumns(
		dateRangeFormatted,
		styles["analytics-empty-cell"],
	);

	const filteredLogs = activityLogs.filter((log) =>
		log.contributorName.toLowerCase().includes(search.toLowerCase()),
	);

	const analyticsData: AnalyticsRow[] = getAnalyticsRows(filteredLogs);

	return (
		<div className={styles["analytics-table"]}>
			<Table<AnalyticsRow> columns={analyticsColumns} data={analyticsData} />
		</div>
	);
};

export { AnalyticsTable };
