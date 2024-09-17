import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

import {
	Loader,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions as projectGroupActions } from "~/modules/groups/groups.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupPatchRequestDto,
} from "~/modules/project-groups/project-groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";
import { getGroupUsersColumns } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const getRowId = (row: UserRow): number => row.id;

type Properties = {
	errors: FieldErrors<
		ProjectGroupCreateRequestDto | ProjectGroupPatchRequestDto
	>;
	onToggle: (id: number) => void;
	selectedUserIds: number[];
	setValue: UseFormSetValue<
		ProjectGroupCreateRequestDto | ProjectGroupPatchRequestDto
	>;
	users: UserGetAllItemResponseDto[];
};

const ProjectGroupUsersTable = ({
	errors,
	onToggle,
	selectedUserIds,
	setValue,
	users,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { usersDataStatus, usersTotalCount } = useAppSelector(
		({ groups }) => groups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		queryParameterPrefix: "group-user",
		totalItemsCount: usersTotalCount,
	});

	const userColumns = getGroupUsersColumns();
	const userData: UserRow[] = getUserRows(users);

	useEffect(() => {
		void dispatch(projectGroupActions.loadUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	useEffect(() => {
		setValue("userIds", selectedUserIds);
	}, [selectedUserIds, setValue]);

	const error = errors["userIds"]?.message;
	const hasError = Boolean(error);

	if (
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING
	) {
		return <Loader />;
	}

	return (
		<>
			<span className={styles["table-title"]}>Users</span>
			<div className={styles["group-users-table"]}>
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

export { ProjectGroupUsersTable };
