import { Table } from "~/libs/components/components.js";
import { type ActivityLogGetAllItemResponseDto } from "~/modules/activity-logs/activity-logs.js";

import {
	getAnalyticsColumns,
	getAnalyticsRows,
	getDateRange,
} from "../../helpers/helpers.js";
import { type AnalyticsRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	activityLogs: ActivityLogGetAllItemResponseDto[];
	dateRange: [Date, Date];
};

const AnalyticsTable = ({
	activityLogs,
	dateRange,
}: Properties): JSX.Element => {
	const [startDate, endDate] = dateRange;
	const dateRangeFormatted = getDateRange(startDate, endDate);

	const analyticsColumns = getAnalyticsColumns(dateRangeFormatted);
	const analyticsData: AnalyticsRow[] = getAnalyticsRows(
		activityLogs,
		dateRangeFormatted,
	);

	return (
		<div className={styles["analytics-table"]}>
			<Table<AnalyticsRow> columns={analyticsColumns} data={analyticsData} />
		</div>
	);
};

export { AnalyticsTable };
