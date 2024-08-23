import styles from "./styles.module.css";

type Properties = {
	name: string;
};

const FIRST_LETTER_INDEX = 0;

const Avatar = ({ name }: Properties): JSX.Element => {
	const firstLetter = name[FIRST_LETTER_INDEX];

	return (
		<div className={styles["avatar"]}>
			<span className={styles["avatar_letter"]}>{firstLetter}</span>
		</div>
	);
};

export { Avatar };
