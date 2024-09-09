import { useEffect } from "react";
import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
} from "~/modules/groups/groups.js";

import { type UserRow } from "../../libs/types/types.js";
import { UsersTable } from "../users-table/users-table.js";
import styles from "./styles.module.css";

const getRowId = (row: UserRow): number => row.id;

type Properties = {
	errors: FieldErrors<GroupCreateRequestDto>;
	onToggle: (id: number) => void;
	selectedUserIds: number[];
	setValue: UseFormSetValue<GroupCreateRequestDto>;
};

const GroupUsersTable = ({
	errors,
	onToggle,
	selectedUserIds,
	setValue,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { users, usersDataStatus, usersTotalCount } = useAppSelector(
		({ groups }) => groups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		queryParameterPrefix: "user",
		totalItemsCount: usersTotalCount,
	});

	useEffect(() => {
		void dispatch(groupActions.loadUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	useEffect(() => {
		setValue("userIds", selectedUserIds);
	}, [selectedUserIds, setValue]);

	if (
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING
	) {
		return <Loader />;
	}

	return (
		<>
			<span className={styles["table-title"]}>Users</span>
			<UsersTable
				getRowId={getRowId}
				name="userIds"
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				onRowSelect={onToggle}
				page={page}
				pageSize={pageSize}
				paginationBackground="secondary"
				selectedIds={selectedUserIds}
				totalItemsCount={usersTotalCount}
				users={users}
			/>
			{selectedUserIds.length === EMPTY_LENGTH && errors.userIds && (
				<div className={styles["error-message"]}>{errors.userIds.message}</div>
			)}
		</>
	);
};

export { GroupUsersTable };
