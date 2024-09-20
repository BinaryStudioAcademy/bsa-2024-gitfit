import { Table, TablePagination } from "~/libs/components/components.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserColumns, getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onDelete: (id: number) => void;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	totalItemsCount: number;
	users: UserGetAllItemResponseDto[];
};

const UsersTable = ({
	isLoading,
	onDelete,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	totalItemsCount,
	users,
}: Properties): JSX.Element => {
	const userColumns = useMemo(() => getUserColumns({ onDelete }), [onDelete]);
	const userData: UserRow[] = getUserRows(users);

	return (
		<div className={styles["users-table"]}>
			<Table<UserRow>
				columns={userColumns}
				data={userData}
				emptyPlaceholder="No users matching your search criteria."
				isLoading={isLoading}
			/>
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
