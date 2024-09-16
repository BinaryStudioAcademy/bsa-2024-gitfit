import { Popover } from "~/libs/components/components.js";

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
