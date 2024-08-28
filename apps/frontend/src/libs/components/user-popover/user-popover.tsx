import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

type Properties = {
	email: string;
	name: string;
};

const UserPopover = ({ email, name }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const handleLogout = useCallback((): void => {
		void dispatch(authActions.logout());
	}, [dispatch]);

	return (
		<div className={styles["user-popup"]}>
			<div className={styles["user-info"]}>
				<p className={styles["user-name"]}>{name}</p>
				<p className={styles["user-email"]}>{email}</p>
			</div>
			<div className={styles["buttons"]}>
				<button className={styles["button"]}>Profile</button>
				<button className={styles["button"]} onClick={handleLogout}>
					Log out
				</button>
			</div>
		</div>
	);
};

export { UserPopover };
