import { PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupsTable, UsersTable } from "./libs/components/components.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { dataStatus: usersDataStatus, users } = useAppSelector(
		({ users }) => users,
	);
	const { dataStatus: groupsDataStatus, groups } = useAppSelector(
		({ groups }) => groups,
	);

	useEffect(() => {
		void dispatch(userActions.loadAll());
		void dispatch(groupActions.loadAll());
	}, [dispatch]);

	const isLoading = [usersDataStatus, groupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Access Management</h1>

			<section>
				<h2 className={styles["section-title"]}>Users</h2>
				<UsersTable users={users} />
			</section>

			<section>
				<h2 className={styles["section-title"]}>Groups</h2>
				<GroupsTable groups={groups} />
			</section>
		</PageLayout>
	);
};

export { AccessManagement };
