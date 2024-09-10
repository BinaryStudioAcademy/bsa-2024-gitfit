import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

import { Table, TablePagination } from "~/libs/components/components.js";
import { useEffect, type UsePaginationValues } from "~/libs/hooks/hooks.js";
import { type GroupCreateRequestDto } from "~/modules/groups/groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import {
	getUserColumns,
	getUserRows,
} from "../users-table/libs/helpers/helpers.js";
import { type UserRow } from "../users-table/libs/types/types.js";
import styles from "./styles.module.css";

const getRowId = (row: UserRow): number => row.id;

type Properties = {
	errors: FieldErrors<GroupCreateRequestDto>;
	onToggle: (id: number) => void;
	pagination: UsePaginationValues;
	selectedUserIds: number[];
	setValue: UseFormSetValue<GroupCreateRequestDto>;
	users: Omit<UserGetAllItemResponseDto, "email">[];
	usersTotalCount: number;
};

const GroupUsersTable = ({
	errors,
	onToggle,
	pagination,
	selectedUserIds,
	setValue,
	users,
	usersTotalCount,
}: Properties): JSX.Element => {
	const { onPageChange, onPageSizeChange, page, pageSize } = pagination;

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	useEffect(() => {
		setValue("userIds", selectedUserIds);
	}, [selectedUserIds, setValue]);

	const error = errors["userIds"]?.message;
	const hasError = Boolean(error);

	return (
		<>
			<span className={styles["table-title"]}>Users</span>
			<div className={styles["users-table"]}>
				<Table<UserRow>
					columns={userColumns}
					data={userData}
					getRowId={getRowId}
					onRowSelect={onToggle}
					selectedRowIds={selectedUserIds}
				/>
				<TablePagination
					background="secondary"
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					page={page}
					pageSize={pageSize}
					totalItemsCount={usersTotalCount}
				/>
			</div>
			{hasError && <span className={styles["error-message"]}>{error}</span>}
		</>
	);
};

export { GroupUsersTable };
