import {
	PageLayout,
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
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import {
	getGroupColumns,
	getGroupRows,
	getUserColumns,
	getUserRows,
} from "./libs/helpers/helpers.js";
import { type GroupRow, type UserRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus: usersDataStatus, users } = useAppSelector(
		({ users }) => users,
	);
	const {
		dataStatus: groupsDataStatus,
		groups,
		totalGroupsCount,
	} = useAppSelector(({ groups }) => groups);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: totalGroupsCount,
	});

	useEffect(() => {
		void dispatch(userActions.loadAll());
		void dispatch(groupActions.loadAll({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

	const isLoading = [usersDataStatus, groupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Access Management</h1>
			<section>
				<h2 className={styles["section-title"]}>Users</h2>
				<Table<UserRow> columns={userColumns} data={userData} />
			</section>
			<section>
				<h2 className={styles["section-title"]}>Groups</h2>
				<Table<GroupRow> columns={groupColumns} data={groupData} />
				<TablePagination
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					page={page}
					// Correct the pageSize value instead of hardcoding it to 0
					pageSize={pageSize}
					totalItemsCount={totalGroupsCount}
				/>
			</section>
		</PageLayout>
	);
};

export { AccessManagement };
