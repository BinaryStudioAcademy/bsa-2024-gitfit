import { Popover } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { formatRelativeTime } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
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

	const { notifications } = useAppSelector(
		({ notifications }) => notifications,
	);

	const handleLoadNotifications = useCallback(() => {
		void dispatch(notificationActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		handleLoadNotifications();
	}, [handleLoadNotifications]);

	const hasNotifications = notifications.length !== EMPTY_LENGTH;

	return (
		<Popover
			content={
				<div className={styles["notifications-popover"]}>
					<h3 className={styles["notifications-title"]}>Notifications</h3>
					<div className={styles["notifications"]}>
						{hasNotifications ? (
							notifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									message={notification.payload}
									timestamp={formatRelativeTime(notification.createdAt)}
								/>
							))
						) : (
							<p className={styles["empty-placeholder"]}>
								There is nothing yet.
							</p>
						)}
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
