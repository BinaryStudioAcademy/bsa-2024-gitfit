import { PageLayout, Table } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
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
	const users = useAppSelector(({ users }) => users.users);
	const groups = useAppSelector(({ groups }) => groups.groups);

	useEffect(() => {
		void dispatch(userActions.loadAll());
		void dispatch(groupActions.loadAll());
	}, [dispatch]);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Access Management</h1>
			<section>
				<h2 className={styles["section-title"]}>Users</h2>
				<Table<UserRow> columns={userColumns} data={userData} />
			</section>
			<section>
				<h2 className={styles["section-title"]}>Groups</h2>
				<Table<GroupRow> columns={groupColumns} data={groupData} />
			</section>
		</PageLayout>
	);
};

export { AccessManagement };
