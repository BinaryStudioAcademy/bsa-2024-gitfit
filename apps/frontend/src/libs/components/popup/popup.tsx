import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
};

const Popup = ({ children, content }: Properties): JSX.Element => {
	return (
		<div className={styles["popup-wrapper"]}>
			<div role="button" tabIndex={0}>
				{children}
			</div>

			<div className={styles["popup-content-wrapper"]}>{content}</div>
		</div>
	);
};

export { Popup };
