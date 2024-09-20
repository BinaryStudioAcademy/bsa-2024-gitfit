import logoSrc from "~/assets/images/logo.svg";
import { Avatar, Icon, NavLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector, usePopover } from "~/libs/hooks/hooks.js";

import {
	NotificationsPopover,
	UserPopover,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const {
		isOpened: isUserOpened,
		onClose: onUserClose,
		onOpen: onUserOpen,
	} = usePopover();
	const {
		isOpened: isNotificationsOpened,
		onClose: onNotificationsClose,
		onOpen: onNotificationsOpen,
	} = usePopover();

	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	if (!authenticatedUser) {
		return <></>;
	}

	const { email, name } = authenticatedUser;

	return (
		<header className={styles["header"]}>
			<NavLink className={styles["logo-link"] as string} to={AppRoute.ROOT}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
			</NavLink>
			<div className={styles["header-popovers"]}>
				<NotificationsPopover
					isOpened={isNotificationsOpened}
					onClose={onNotificationsClose}
				>
					<button
						className={getValidClassNames(
							styles["notifications-popover-trigger"],
							isNotificationsOpened &&
								styles["notifications-popover-trigger-opened"],
						)}
						onClick={
							isNotificationsOpened ? onNotificationsClose : onNotificationsOpen
						}
					>
						<span className={styles["notifications-icon-wrapper"]}>
							<Icon height={22} name="notifications" width={22} />
						</span>
					</button>
				</NotificationsPopover>
				<UserPopover
					email={email}
					isOpened={isUserOpened}
					name={name}
					onClose={onUserClose}
				>
					<button
						className={styles["user-popover-trigger"]}
						onClick={isUserOpened ? onUserClose : onUserOpen}
					>
						<Avatar name={name} />
					</button>
				</UserPopover>
			</div>
		</header>
	);
};

export { Header };
