import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	imageSrc?: string;
	name: string;
};

const FIRST_LETTER_INDEX = 0;

const Avatar = ({ imageSrc, name }: Properties): JSX.Element => {
	const firstLetter = name[FIRST_LETTER_INDEX];

	return (
		<div
			className={getValidClassNames(
				styles["avatar"],
				!imageSrc && styles["no-image"],
			)}
		>
			{imageSrc ? (
				<img alt={name} className={styles["avatar-image"]} src={imageSrc} />
			) : (
				<span className={styles["avatar-letter"]}>{firstLetter}</span>
			)}
		</div>
	);
};

export { Avatar };
