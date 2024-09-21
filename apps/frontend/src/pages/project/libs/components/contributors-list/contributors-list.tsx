import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorCard } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[];
	contributors: ContributorGetAllItemResponseDto[];
	isLoading: boolean;
	onEditContributor: (contributorId: number) => void;
};

const ContributorsList = ({
	activityLogs,
	contributors,
	isLoading,
	onEditContributor,
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

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Contributors</h2>
			{isLoading && <Loader />}
			{isListShown && (
				<ul className={styles["list"]}>
					{contributors.map((contributor) => (
						<li key={contributor.id}>
							<ContributorCard
								activityLog={
									activityLogs.find(
										(activityLog) =>
											Number(activityLog.contributorId) === contributor.id,
									)?.commitsNumber
								}
								contributor={contributor}
								onEdit={handleEditContributor}
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
