import styles from "./styles.module.css";

const Loader = (): JSX.Element => (
	<div className={styles["loader-wrapper"]}>
		<span className={styles["loader"]}>Loading</span>
	</div>
);

export { Loader };
