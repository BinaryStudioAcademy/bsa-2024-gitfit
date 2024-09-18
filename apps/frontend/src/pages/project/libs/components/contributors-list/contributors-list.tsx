import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
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
	const hasContributors = contributors.length > EMPTY_LENGTH;

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Contributors</h2>
			{isLoading && <Loader />}
			{!isLoading && hasContributors && (
				<ul className={styles["list"]}>
					{contributors.map((contributor) => (
						<li key={contributor.id}>
							<ContributorCard contributor={contributor} />
						</li>
					))}
				</ul>
			)}
			{!isLoading && !hasContributors && (
				<p className={styles["empty-placeholder"]}>
					There are no contributors at the moment. Please set up analytics if
					you haven&#39;t already.
				</p>
			)}
		</div>
	);
};

export { ContributorsList };
