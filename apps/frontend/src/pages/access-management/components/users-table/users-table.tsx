import { Table, TablePagination } from "~/libs/components/components.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserColumns, getUserRows } from "../../libs/helpers/helpers.js";
import { type UserRow } from "../../libs/types/types.js";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
	page: number;
	pageSize: number;
	totalItemsCount: number;
	users: UserGetAllItemResponseDto[];
};

const UsersTable = ({
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	totalItemsCount,
	users,
}: Properties): JSX.Element => {
	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	return (
		<div>
			<Table<UserRow> columns={userColumns} data={userData} />
			<TablePagination
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
