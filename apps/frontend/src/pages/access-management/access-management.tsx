import { PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupsTable, UsersTable } from "./libs/components/components.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		dataStatus: usersDataStatus,
		users,
		usersTotalCount,
	} = useAppSelector(({ users }) => users);

	const {
		dataStatus: groupsDataStatus,
		groups,
		groupsTotalCount,
	} = useAppSelector(({ groups }) => groups);

	const {
		onPageChange: onUserPageChange,
		onPageSizeChange: onUserPageSizeChange,
		page: userPage,
		pageSize: userPageSize,
	} = usePagination({
		queryParameterPrefix: "user",
		totalItemsCount: usersTotalCount,
	});

	const {
		onPageChange: onGroupPageChange,
		onPageSizeChange: onGroupPageSizeChange,
		page: groupPage,
		pageSize: groupPageSize,
	} = usePagination({
		queryParameterPrefix: "group",
		totalItemsCount: groupsTotalCount,
	});

	useEffect(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
		void dispatch(
			groupActions.loadAll({ page: groupPage, pageSize: groupPageSize }),
		);
	}, [dispatch, userPage, userPageSize, groupPage, groupPageSize]);

	const isLoading = [usersDataStatus, groupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Access Management</h1>

			<section>
				<h2 className={styles["section-title"]}>Users</h2>

				<div className={styles["table"]}>
					<UsersTable
						onPageChange={onUserPageChange}
						onPageSizeChange={onUserPageSizeChange}
						page={userPage}
						pageSize={userPageSize}
						totalItemsCount={usersTotalCount}
						users={users}
					/>
				</div>
			</section>

			<section>
				<h2 className={styles["section-title"]}>Groups</h2>

				<div className={styles["table"]}>
					<GroupsTable
						groups={groups}
						onPageChange={onGroupPageChange}
						onPageSizeChange={onGroupPageSizeChange}
						page={groupPage}
						pageSize={groupPageSize}
						totalItemsCount={groupsTotalCount}
					/>
				</div>
			</section>
		</PageLayout>
	);
};

export { AccessManagement };
