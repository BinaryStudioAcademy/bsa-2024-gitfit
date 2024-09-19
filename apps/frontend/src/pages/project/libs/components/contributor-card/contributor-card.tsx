import { useCallback } from "~/libs/hooks/hooks.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
	onEdit: (contributorId: number) => void;
};

const ContributorCard = ({ contributor, onEdit }: Properties): JSX.Element => {
	const handleEditClick = useCallback(() => {
		onEdit(contributor.id);
	}, [onEdit, contributor.id]);

	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
			<ContributorMenu
				contributorId={contributor.id}
				onEdit={handleEditClick}
			/>
		</div>
	);
};

export { ContributorCard };
