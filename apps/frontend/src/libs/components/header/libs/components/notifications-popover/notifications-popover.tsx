import { Popover } from "~/libs/components/components.js";
import { useAppDispatch, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import { actions as notificationActions } from "~/modules/notifications/notifications.js";

import { NotificationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
};

const NotificationsPopover = ({
	children,
	isOpened,
	onClose,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const handleLoadNotifications = useCallback(() => {
		void dispatch(notificationActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		handleLoadNotifications();
	}, [handleLoadNotifications]);

	return (
		<Popover
			content={
				<div className={styles["notifications-popover"]}>
					<h3 className={styles["notifications-title"]}>Notifications</h3>
					<div className={styles["notifications"]}>
						<NotificationItem
							message="Statistics for Project 1 is not uploaded for N days."
							timestamp="5 minutes ago"
						/>
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

export { NotificationsPopover };
