import { NavLink } from "react-router-dom";

import { Popover } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	email: string;
	isOpened: boolean;
	name: string;
	onClose: () => void;
};

const UserPopover = ({
	children,
	email,
	isOpened,
	name,
	onClose,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const handleLogout = useCallback((): void => {
		void dispatch(authActions.logout());
	}, [dispatch]);

	return (
		<Popover
			content={
				<div className={styles["user-popover"]}>
					<div className={styles["user-info"]}>
						<p className={styles["user-name"]}>{name}</p>
						<p className={styles["user-email"]}>{email}</p>
					</div>
					<div className={styles["buttons"]}>
						<NavLink
							className={styles["button"] as string}
							to={AppRoute.PROFILE}
						>
							Profile
						</NavLink>
						<button className={styles["button"]} onClick={handleLogout}>
							Log out
						</button>
					</div>
				</div>
			}
			isOpened={isOpened}
			onClose={onClose}
		>
			{children}
		</Popover>
	);
};

export { UserPopover };
