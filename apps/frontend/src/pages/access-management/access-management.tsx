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
  
	const { totalUsers, users } = useAppSelector(({ users }) => ({
		totalUsers: users.totalUsers,
		users: users.users,
	}));
    
  const { dataStatus: usersDataStatus, users } = useAppSelector(
		({ users }) => users,
	);
	const { dataStatus: groupsDataStatus, groups } = useAppSelector(
		({ groups }) => groups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: totalUsers,
	});

	useEffect(() => {
		void dispatch(userActions.loadAll({ page, pageSize }));
		void dispatch(groupActions.loadAll());
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
				<div className={styles["users-table"]}>
				<Table<UserRow> columns={columns} data={data} />
				<TablePagination
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					page={page}
					pageSize={pageSize}
					totalItemsCount={totalUsers}
				/>
			</div>
			</section>
			<section>
				<h2 className={styles["section-title"]}>Groups</h2>
				<Table<GroupRow> columns={groupColumns} data={groupData} />
			</section>
		</PageLayout>
	);
};

export { AccessManagement };
