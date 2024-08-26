import { formatDate, type UserAuthResponseDto } from "@git-fit/shared";

import { Table } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { TABLE_COLUMNS as headers } from "./libs/constants/constants.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users);

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	const columns: UserAuthResponseDto[] = users.map((user) => ({
		...user,
		createdAt: formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
	}));

	return (
		<div className={styles["content"]}>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<Table<User> columns={headers} data={columns} />
		</div>
	);
};

export { AccessManagement };
