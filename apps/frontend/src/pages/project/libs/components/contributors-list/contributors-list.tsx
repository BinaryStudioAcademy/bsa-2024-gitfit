import { Button, Loader } from "~/libs/components/components.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";
import {
	type ContributorActivity,
	type ContributorGetAllItemResponseDto,
} from "~/pages/project/libs/types/types.js";

import { ContributorCard } from "../components.js";
import { SyncTime } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[];
	analyticsLastSyncedAt: null | string;
	analyticsLastSyncedByUser: null | string;
	contributors: ContributorGetAllItemResponseDto[];
	hasContributors: boolean;
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	hasSetupAnalyticsPermission: boolean;
	hasSplitPermission: boolean;
	isLoading: boolean;
	onClickSetupAgain: () => void;
	onEditContributor: (contributorId: number) => void;
	onMergeContributor: (contributorId: number) => void;
	onSplitContributor: (contributorId: number) => void;
	projectId: string;
};

const ContributorsList = ({
	activityLogs,
	analyticsLastSyncedAt,
	analyticsLastSyncedByUser,
	contributors,
	hasContributors,
	hasEditPermission,
	hasMergePermission,
	hasSetupAnalyticsPermission,
	hasSplitPermission,
	isLoading,
	onClickSetupAgain,
	onEditContributor,
	onMergeContributor,
	onSplitContributor,
	projectId,
}: Properties): JSX.Element => {
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
				Number(activityLog.contributor.id),
				activityLog.commitsNumber,
			);
		}

		return activitiesMap;
	}, [activityLogs]);

	const hasSyncTime =
		analyticsLastSyncedAt !== null && analyticsLastSyncedByUser !== null;

	return (
		<div className={styles["container"]}>
			<div className={styles["contributors-header-wrapper"]}>
				<h2 className={styles["title"]}>Contributors</h2>
				{hasSyncTime && (
					<SyncTime
						analyticsLastSyncedAt={analyticsLastSyncedAt}
						analyticsLastSyncedByUser={analyticsLastSyncedByUser}
					/>
				)}

				{hasSetupAnalyticsPermission && hasContributors && (
					<div className={styles["button-wrapper"]}>
						<Button
							label="Setup Again"
							onClick={onClickSetupAgain}
							variant="outlined"
						/>
					</div>
				)}
			</div>
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
