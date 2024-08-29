import { PageLayout, Table } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { getGroupColumns } from "./libs/helpers/get-group-columns.helper.js";
import { getGroupRows } from "./libs/helpers/get-group-rows.helper.js";
import { getUserColumns } from "./libs/helpers/get-user-columns.helper.js";
import { getUserRows } from "./libs/helpers/helpers.js";
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
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<Table<UserRow> columns={userColumns} data={userData} />
			<p className={styles["sub-title"]}>Groups</p>
			<Table<GroupRow> columns={groupColumns} data={groupData} />
		</PageLayout>
	);
};

export { AccessManagement };
