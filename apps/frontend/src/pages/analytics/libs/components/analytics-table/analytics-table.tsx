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
	emptyPlaceholder: string;
	isLoading: boolean;
};

const AnalyticsTable = ({
	activityLogs,
	dateRange,
	emptyPlaceholder,
	isLoading,
}: Properties): JSX.Element => {
	const [startDate, endDate] = dateRange;
	const dateRangeFormatted = getDateRange(startDate, endDate);

	const analyticsColumns = getAnalyticsColumns(
		dateRangeFormatted,
		styles["analytics-empty-cell"],
	);

	const analyticsData: AnalyticsRow[] = getAnalyticsRows(activityLogs);

	return (
		<div className={styles["analytics-table"]}>
			<Table<AnalyticsRow>
				columns={analyticsColumns}
				data={analyticsData}
				emptyPlaceholder={emptyPlaceholder}
				isFullHeight
				isLoading={isLoading}
			/>
		</div>
	);
};

export { AnalyticsTable };
