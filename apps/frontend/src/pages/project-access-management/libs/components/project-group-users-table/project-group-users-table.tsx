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
	useCallback,
	useEffect,
	usePagination,
	useSearch,
} from "~/libs/hooks/hooks.js";
import { actions as projectGroupActions } from "~/modules/project-groups/project-groups.js";
import { type ProjectGroupCreateRequestDto } from "~/modules/project-groups/project-groups.js";

import { filterUserProjectGroups, getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";
import { ProjectGroupUsersSearch } from "./libs/components/components.js";
import { getGroupUsersColumns } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const getRowId = (row: UserRow): number => row.id;

type Properties = {
	errors: FieldErrors<ProjectGroupCreateRequestDto>;
	onToggle: (id: number) => void;
	selectedUserIds: number[];
	setValue: UseFormSetValue<ProjectGroupCreateRequestDto>;
};

const ProjectGroupUsersTable = ({
	errors,
	onToggle,
	selectedUserIds,
	setValue,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { onSearch, search } = useSearch();

	const { projectGroups, users, usersDataStatus, usersTotalCount } =
		useAppSelector(({ projectGroups }) => projectGroups);

	const usersWithCurrentProjectGroups = filterUserProjectGroups(
		users,
		projectGroups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		queryParameterPrefix: "group-user",
		totalItemsCount: usersTotalCount,
	});

	const handleSearchChange = useCallback(
		(value: string) => {
			onSearch(value);
		},
		[onSearch],
	);

	const userColumns = getGroupUsersColumns();
	const userData: UserRow[] = getUserRows(usersWithCurrentProjectGroups);

	useEffect(() => {
		void dispatch(
			projectGroupActions.loadUsers({ name: search, page, pageSize }),
		);
	}, [dispatch, page, pageSize, search]);

	useEffect(() => {
		setValue("userIds", selectedUserIds);
	}, [selectedUserIds, setValue]);

	const error = errors["userIds"]?.message;
	const hasError = Boolean(error);

	const hasUserRows = userData.length !== EMPTY_LENGTH;

	const isLoading =
		usersDataStatus === DataStatus.IDLE ||
		(usersDataStatus === DataStatus.PENDING && !hasUserRows);

	return (
		<>
			<span className={styles["table-title"]}>Users</span>
			<ProjectGroupUsersSearch onChange={handleSearchChange} />
			{isLoading ? (
				<Loader />
			) : (
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
			)}
			{hasError && <span className={styles["error-message"]}>{error}</span>}
		</>
	);
};

export { ProjectGroupUsersTable };
