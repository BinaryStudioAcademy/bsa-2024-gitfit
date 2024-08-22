import styles from "./styles.module.css";

type Properties = {
	name?: string;
};

const FIRST_LETTER_INDEX = 0;

const Avatar = ({ name }: Properties): JSX.Element => {
	let firstLetter = null;

	if (name && name.length > FIRST_LETTER_INDEX) {
		firstLetter = name[FIRST_LETTER_INDEX];
	}

	const hasFirstLetter = Boolean(firstLetter);

	// TODO: render avatar image instead of first letter (in case if image present)
	return (
		<div className={styles["avatar"]}>
			{hasFirstLetter && (
				<span className={styles["avatar_letter"]}>{firstLetter}</span>
			)}
		</div>
	);
};

export { Avatar };
