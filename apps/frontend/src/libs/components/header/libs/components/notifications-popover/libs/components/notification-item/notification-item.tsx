import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isRead: boolean;
	message: string;
	timestamp: string;
};

const NotificationItem = ({
	isRead,
	message,
	timestamp,
}: Properties): JSX.Element => {
	const itemClassName = getValidClassNames(
		styles["notification-item"],
		!isRead && styles["notification-item-unread"],
	);

	return (
		<div className={itemClassName}>
			<p className={styles["notification-item-timestamp"]}>{timestamp}</p>
			<p className={styles["notification-item-message"]}>{message}</p>
		</div>
	);
};

export { NotificationItem };
