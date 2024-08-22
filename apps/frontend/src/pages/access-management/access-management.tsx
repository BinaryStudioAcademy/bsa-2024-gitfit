import { Table } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { columns as nameOfColumns } from "./libs/enums/enums.js";
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
			<p className={styles["content__title"]}>Access Management</p>
			<p className={styles["content__sub-title"]}>Users</p>
			<div className={styles["content__table"]}>
				<Table<User> columns={nameOfColumns} data={transformedData} />
			</div>
		</div>
	);
};

export { AccessManagement };
