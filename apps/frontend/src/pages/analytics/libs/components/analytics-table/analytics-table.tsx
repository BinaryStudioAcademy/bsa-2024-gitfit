import { Table } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const mockColumns = [
	{
		accessorKey: "contributorName",
		header: "Name",
	},
	{
		accessorKey: "day1",
		header: "Sep 13",
	},
	{
		accessorKey: "day2",
		header: "Sep 14",
	},
	{
		accessorKey: "day3",
		header: "Sep 15",
	},
	{
		accessorKey: "day4",
		header: "Sep 16",
	},
	{
		accessorKey: "day5",
		header: "Sep 17",
	},
	{
		accessorKey: "day6",
		header: "Sep 18",
	},
	{
		accessorKey: "day7",
		header: "Sep 19",
	},
	{
		accessorKey: "day8",
		header: "Sep 20",
	},
];

const mockData = [
	{
		contributorName: "Alice",
		day1: 5,
		day2: 1,
		day3: 2,
		day4: 1,
		day5: 3,
		day6: 2,
		day7: 4,
		day8: 2,
	},
	{
		contributorName: "Bob",
		day1: 3,
		day2: 7,
		day3: 1,
		day4: 1,
		day5: 2,
		day6: 2,
		day7: 3,
		day8: 1,
	},
	{
		contributorName: "Charlie",
		day1: 3,
		day2: 8,
		day3: 3,
		day4: 1,
		day5: 2,
		day6: 5,
		day7: 2,
		day8: 1,
	},
	{
		contributorName: "Diana",
		day1: 2,
		day2: 4,
		day3: 3,
		day4: 1,
		day5: 1,
		day6: 3,
		day7: 2,
		day8: 2,
	},
	{
		contributorName: "Denis",
		day1: 1,
		day2: 7,
		day3: 5,
		day4: 1,
		day5: 2,
		day6: 4,
		day7: 3,
		day8: 2,
	},
];

type Properties = {
	search: string;
};

const AnalyticsTable = ({ search }: Properties): JSX.Element => {
	const filteredData = mockData.filter((row) =>
		row.contributorName.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className={styles["analytics-table"]}>
			<Table
				columns={mockColumns}
				data={filteredData}
				emptyPlaceholder="No contributors matching your search criteria."
			/>
		</div>
	);
};

export { AnalyticsTable };
