import { Table, TablePagination } from "~/libs/components/components.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserColumns, getUserRows } from "../../libs/helpers/helpers.js";
import { type UserRow } from "../../libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	selectedIds?: Set<number>;
	totalItemsCount: number;
	users: UserGetAllItemResponseDto[];
};

const UsersTable = ({
	onPageChange,
	onPageSizeChange,
	onRowSelect,
	page,
	pageSize,
	paginationBackground = "primary",
	selectedIds,
	totalItemsCount,
	users,
}: Properties): JSX.Element => {
	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	return (
		<div className={styles["users-table"]}>
			{onRowSelect && selectedIds ? (
				<Table<UserRow>
					columns={userColumns}
					data={userData}
					onRowSelect={onRowSelect}
					selectedIds={selectedIds}
				/>
			) : (
				<Table<UserRow> columns={userColumns} data={userData} />
			)}
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

export { UsersTable };
