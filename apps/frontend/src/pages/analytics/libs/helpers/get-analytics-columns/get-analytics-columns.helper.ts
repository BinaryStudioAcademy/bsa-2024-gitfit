import { type TableColumn } from "~/libs/types/types.js";

import { type AnalyticsRow } from "../../types/types.js";

const getAnalyticsColumns = (
	dateRange: string[],
): TableColumn<AnalyticsRow>[] => {
	const columns: TableColumn<AnalyticsRow>[] = [
		{
			accessorKey: "contributorName",
			header: "Name",
			size: 220,
		},
	];

	const dateColumns: TableColumn<AnalyticsRow>[] = dateRange.map((date) => ({
		accessorKey: `commitsNumber_${date}.commitsNumber`,
		header: date,
		size: 95,
	}));

	return [...columns, ...dateColumns];
};

export { getAnalyticsColumns };
