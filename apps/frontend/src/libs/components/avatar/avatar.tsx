import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	imageUrl?: string;
	name: string;
};

const FIRST_LETTER_INDEX = 0;

const Avatar = ({ imageUrl, name }: Properties): JSX.Element => {
	const firstLetter = name[FIRST_LETTER_INDEX];
	const hasImage = Boolean(imageUrl);

	return (
		<div
			className={getValidClassNames(
				styles["avatar"],
				!imageUrl && styles["no-image"],
			)}
		>
			{hasImage ? (
				<img alt={name} className={styles["avatar-image"]} src={imageUrl} />
			) : (
				<span className={styles["avatar-letter"]}>{firstLetter}</span>
			)}
		</div>
	);
};

export { Avatar };
