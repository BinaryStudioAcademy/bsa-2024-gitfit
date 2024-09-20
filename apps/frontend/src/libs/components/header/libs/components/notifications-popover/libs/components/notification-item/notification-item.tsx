import styles from "./styles.module.css";

type Properties = {
	message: string;
	timestamp: string;
};

const NotificationItem = ({ message, timestamp }: Properties): JSX.Element => {
	return (
		<div className={styles["notification-item"]}>
			<p className={styles["notification-item-timestamp"]}>{timestamp}</p>
			<p className={styles["notification-item-message"]}>{message}</p>
		</div>
	);
};

export { NotificationItem };
