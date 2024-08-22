import styles from "./styles.module.css";

interface Properties {
	name?: string | undefined;
}

const Avatar = ({ name }: Properties): JSX.Element => {
	return (
		<div className={styles["avatar"]}>
			<span className={styles["avatar_letter"]}>{name}</span>
		</div>
	);
};

export { Avatar };
