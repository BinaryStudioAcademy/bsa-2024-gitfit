import { Table } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { columnHeader } from "./libs/constants/constants.js";
import { transformUserData } from "./libs/helpers/helpers.js";
import { type User } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const users = useAppSelector(({ users }) => users.users);
	const isAccessManagement = pathname === AppRoute.ACCESS_MANAGEMENT;
	useEffect(() => {
		if (isAccessManagement) {
			void dispatch(userActions.loadAll());
		}
	}, [isAccessManagement, dispatch]);

	const transformedData: User[] = transformUserData(users);

	return (
		<div className={styles["content"]}>
			<p className={styles["title"]}>Access Management</p>
			<p className={styles["sub-title"]}>Users</p>
			<div className={styles["table-container"]}>
				<Table<User> columns={columnHeader} data={transformedData} />
			</div>
		</div>
	);
};

export { AccessManagement };
