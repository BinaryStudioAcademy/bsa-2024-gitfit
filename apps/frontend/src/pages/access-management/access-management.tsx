import { PageLayout, Table } from "~/libs/components/components.js";
import { getUserColumns } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { getUserRows } from "./libs/helpers/helpers.js";
import { type UserRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users);

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	const columns = getUserColumns();
	const data: UserRow[] = getUserRows(users);

	return (
		<PageLayout>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<Table<UserRow> columns={columns} data={data} />
		</PageLayout>
	);
};

export { AccessManagement };
