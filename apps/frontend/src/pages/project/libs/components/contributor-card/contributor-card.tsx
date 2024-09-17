import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
};

const ContributorCard = ({ contributor }: Properties): JSX.Element => {
	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
		</div>
	);
};

export { ContributorCard };
