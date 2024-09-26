import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type AnalyticsRow } from "../../types/types.js";
import styles from "./styles.module.css";

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
				const value = getValue() as string;
				const isEmpty = !Number(value);

				return (
					<span
						className={getValidClassNames(
							styles["analytics-cell"],
							isEmpty && styles["analytics-empty-cell"],
						)}
					>
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
