import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
	onMerge: () => void;
};

const ContributorCard = ({ contributor, onMerge }: Properties): JSX.Element => {
	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
			<ContributorMenu contributorId={contributor.id} onMerge={onMerge} />
		</div>
	);
};

export { ContributorCard };
