import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";
import {
	type ContributorActivity,
	type ContributorGetAllItemResponseDto,
} from "~/pages/project/libs/types/types.js";

import { ContributorCard } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[];
	contributors: ContributorGetAllItemResponseDto[];
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	hasSplitPermission: boolean;
	isLoading: boolean;
	onEditContributor: (contributorId: number) => void;
	onMergeContributor: (contributorId: number) => void;
	onSplitContributor: (contributorId: number) => void;
	projectId: string;
};

const ContributorsList = ({
	activityLogs,
	contributors,
	hasEditPermission,
	hasMergePermission,
	hasSplitPermission,
	isLoading,
	onEditContributor,
	onMergeContributor,
	onSplitContributor,
	projectId,
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

	const handleSplitContributor = useCallback(
		(contributorId: number) => {
			onSplitContributor(contributorId);
		},
		[onSplitContributor],
	);

	const activities = useMemo(() => {
		const activitiesMap = new Map<number, ContributorActivity>();

		for (const activityLog of activityLogs) {
			activitiesMap.set(
				Number(activityLog.contributorId),
				activityLog.commitsNumber,
			);
		}

		return activitiesMap;
	}, [activityLogs]);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Contributors</h2>
			{isLoading && <Loader />}
			{isListShown && (
				<ul className={styles["list"]}>
					{contributors.map((contributor) => (
						<li key={contributor.id}>
							<ContributorCard
								activity={activities.get(contributor.id)}
								contributor={contributor}
								hasEditPermission={hasEditPermission}
								hasMergePermission={hasMergePermission}
								hasSplitPermission={hasSplitPermission}
								onEdit={handleEditContributor}
								onMerge={handleMergeContributor}
								onSplit={handleSplitContributor}
								projectId={projectId}
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
