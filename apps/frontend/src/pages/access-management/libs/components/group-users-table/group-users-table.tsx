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
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useSearchFilters,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
} from "~/modules/groups/groups.js";

import { getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";
import { GroupUsersSearch } from "./libs/components/components.js";
import { getGroupUsersColumns } from "./libs/helpers/helpers.js";
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
	const { onSearch, search } = useSearchFilters({ isSavedToUrl: false });
	const { users, usersDataStatus, usersTotalCount } = useAppSelector(
		({ groups }) => groups,
	);

	const { control, errors: formErrors } = useAppForm({
		defaultValues: { search: "" },
	});

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
	const userData: UserRow[] = getUserRows(users);

	useEffect(() => {
		void dispatch(groupActions.loadUsers({ name: search, page, pageSize }));
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
			<div>
				<span className={styles["table-title"]}>Users</span>
				<GroupUsersSearch
					control={control}
					errors={formErrors}
					name="search"
					onChange={handleSearchChange}
				/>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles["group-users-table"]}>
					<Table<UserRow>
						columns={userColumns}
						data={userData}
						emptyPlaceholder="No users matching your search criteria."
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

export { GroupUsersTable };
