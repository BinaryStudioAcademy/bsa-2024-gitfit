import styles from "./styles.module.css";

const Loader = (): JSX.Element => (
	<div className={styles["loader-wrapper"]}>
		<div aria-label="Loading" className={styles["loader"]} role="status" />
	</div>
);

export { Loader };
