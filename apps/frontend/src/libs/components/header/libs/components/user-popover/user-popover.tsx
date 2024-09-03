import { NavLink } from "react-router-dom";

import { Popover } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	email: string;
	name: string;
};

const UserPopover = ({ children, email, name }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { isPopoverOpened, onPopoverClose, onPopoverOpen } = usePopover();

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
						<NavLink className={styles["button"] ?? ""} to={AppRoute.PROFILE}>
							Profile
						</NavLink>
						<button className={styles["button"]} onClick={handleLogout}>
							Log out
						</button>
					</div>
				</div>
			}
			isPopoverOpened={isPopoverOpened}
			onPopoverClose={onPopoverClose}
			onPopoverOpen={onPopoverOpen}
		>
			{children}
		</Popover>
	);
};

export { UserPopover };
