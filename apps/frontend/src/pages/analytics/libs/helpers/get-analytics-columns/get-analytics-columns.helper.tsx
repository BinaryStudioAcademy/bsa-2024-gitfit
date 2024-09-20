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

	const dateColumns: TableColumn<AnalyticsRow>[] = dateRange.map(
		(date, index) => ({
			accessorKey: `commitsNumber.${String(index)}`,
			cell: ({ getValue }): JSX.Element => {
				const NO_COMIITS = 0;
				const value = getValue() as string;
				const isEmpty = Number(value) === NO_COMIITS;

				return (
					<span style={{ color: isEmpty ? "var(--color-danger)" : "inherit" }}>
						{isEmpty ? "-" : value}
					</span>
				);
			},
			header: date,
			size: 95,
		}),
	);

	return [...columns, ...dateColumns];
};

export { getAnalyticsColumns };
