import { Table } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { columnHeader as headers } from "./libs/constants/constants.js";
import { transformUserData } from "./libs/helpers/helpers.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users);

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	const columns: User[] = transformUserData(users);

	return (
		<div className={styles["content"]}>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<div className={styles["table-container"]}>
				<Table<User> columns={headers} data={columns} />
			</div>
		</div>
	);
};

export { AccessManagement };
