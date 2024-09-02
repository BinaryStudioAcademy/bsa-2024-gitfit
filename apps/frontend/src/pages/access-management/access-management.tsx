import {
	PageLayout,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { getUserColumns } from "./libs/helpers/get-user-columns.helper.js";
import { getUserRows } from "./libs/helpers/helpers.js";
import { type UserRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { totalUsers, users } = useAppSelector(({ users }) => ({
		totalUsers: users.totalUsers,
		users: users.users,
	}));

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: totalUsers,
	});

	useEffect(() => {
		void dispatch(userActions.loadAll({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	const columns = getUserColumns();
	const data: UserRow[] = getUserRows(users);

	return (
		<PageLayout>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
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
		</PageLayout>
	);
};

export { AccessManagement };
