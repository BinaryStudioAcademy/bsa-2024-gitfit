import { type UserAuthResponseDto } from "@git-fit/shared";

import { Table } from "~/libs/components/components.js";
import { getUserColumns } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users);

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	const columns = getUserColumns();
	const data: UserAuthResponseDto[] = users;

	return (
		<div className={styles["content"]}>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<Table<UserAuthResponseDto> columns={columns} data={data} />
		</div>
	);
};

export { AccessManagement };
