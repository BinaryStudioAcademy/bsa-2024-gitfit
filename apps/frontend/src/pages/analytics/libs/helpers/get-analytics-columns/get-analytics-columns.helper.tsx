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
		cell: ({ getValue }): JSX.Element => {
			const value = getValue() as string;
			const isEmpty = value === "-";

			return (
				<span style={{ color: isEmpty ? "var(--color-danger)" : "inherit" }}>
					{value}
				</span>
			);
		},
		header: date,
		size: 95,
	}));

	return [...columns, ...dateColumns];
};

export { getAnalyticsColumns };
