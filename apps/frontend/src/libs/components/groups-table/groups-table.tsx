import { Table, TablePagination } from "~/libs/components/components.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "./libs/helpers/helpers.js";
import { type GroupRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	totalItemsCount: number;
};

const GroupsTable = ({
	groups,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	totalItemsCount,
}: Properties): JSX.Element => {
	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

	return (
		<div className={styles["groups-table"]}>
			<Table<GroupRow> columns={groupColumns} data={groupData} />
			<TablePagination
				background={paginationBackground}
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={totalItemsCount}
			/>
		</div>
	);
};

export { GroupsTable };
