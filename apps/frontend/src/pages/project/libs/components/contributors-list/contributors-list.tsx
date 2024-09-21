import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorCard } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	contributors: ContributorGetAllItemResponseDto[];
	hasEditPermission: boolean;
	isLoading: boolean;
	onEditContributor: (contributorId: number) => void;
	onMergeContributor: (contributorId: number) => void;
};

const ContributorsList = ({
	contributors,
	hasEditPermission,
	isLoading,
	onEditContributor,
	onMergeContributor,
}: Properties): JSX.Element => {
	const hasContributors = contributors.length > EMPTY_LENGTH;
	const isListShown = !isLoading && hasContributors;
	const isEmptyPlaceholderShown = !isLoading && !hasContributors;

	const handleEditContributor = useCallback(
		(contributorId: number) => {
			onEditContributor(contributorId);
		},
		[onEditContributor],
	);

	const handleMergeContributor = useCallback(
		(contributorId: number) => {
			onMergeContributor(contributorId);
		},
		[onMergeContributor],
	);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Contributors</h2>
			{isLoading && <Loader />}
			{isListShown && (
				<ul className={styles["list"]}>
					{contributors.map((contributor) => (
						<li key={contributor.id}>
							<ContributorCard
								contributor={contributor}
								hasEditPermission={hasEditPermission}
								onEdit={handleEditContributor}
								onMerge={handleMergeContributor}
							/>
						</li>
					))}
				</ul>
			)}
			{isEmptyPlaceholderShown && (
				<p className={styles["empty-placeholder"]}>
					There are no contributors at the moment. Please set up analytics if
					you haven&#39;t already.
				</p>
			)}
		</div>
	);
};

export { ContributorsList };
