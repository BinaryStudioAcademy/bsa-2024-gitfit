import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { NotificationStatus } from "../../enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	message: string;
	status: ValueOf<typeof NotificationStatus>;
	timestamp: string;
};

const NotificationItem = ({
	message,
	status,
	timestamp,
}: Properties): JSX.Element => {
	const itemClassName = getValidClassNames(
		styles["notification-item"],
		status === NotificationStatus.UNREAD && styles["notification-item-unread"],
	);

	return (
		<div className={itemClassName}>
			<p className={styles["notification-item-timestamp"]}>{timestamp}</p>
			<p className={styles["notification-item-message"]}>{message}</p>
		</div>
	);
};

export { NotificationItem };
