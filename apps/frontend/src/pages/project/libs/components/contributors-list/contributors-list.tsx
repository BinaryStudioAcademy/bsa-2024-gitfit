import { Loader } from "~/libs/components/components.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorCard } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	contributors: ContributorGetAllItemResponseDto[];
	isLoading: boolean;
};

const ContributorsList = ({
	contributors,
	isLoading,
}: Properties): JSX.Element => {
	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Contributors</h2>
			{isLoading ? (
				<Loader />
			) : (
				<ul className={styles["list"]}>
					{contributors.map((contributor) => (
						<li key={contributor.id}>
							<ContributorCard contributor={contributor} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export { ContributorsList };
