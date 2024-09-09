import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

import {
	Loader,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
} from "~/modules/groups/groups.js";

import { getUserColumns, getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";
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
		queryParameterPrefix: "group-user",
		totalItemsCount: usersTotalCount,
	});

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	useEffect(() => {
		void dispatch(groupActions.loadUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	useEffect(() => {
		setValue("userIds", selectedUserIds);
	}, [selectedUserIds, setValue]);

	const error = errors["userIds"]?.message;
	const hasError = Boolean(error);
	const hasSelectedUserIds = selectedUserIds.length === EMPTY_LENGTH;

	if (
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING
	) {
		return <Loader />;
	}

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
			{hasError && hasSelectedUserIds && (
				<div className={styles["error-message"]}>{error}</div>
			)}
		</>
	);
};

export { GroupUsersTable };
