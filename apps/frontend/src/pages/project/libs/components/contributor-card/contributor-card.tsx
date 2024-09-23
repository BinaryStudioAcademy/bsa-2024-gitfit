import { ActivityIndicator, Chart } from "~/libs/components/components.js";
import { MIN_GIT_EMAILS_LENGTH_FOR_SPLIT } from "~/libs/constants/constants.js";
import {
	getActivityIndicatorStatus,
	getDifferenceInDays,
	getRelativeDate,
	getStartOfDay,
} from "~/libs/helpers/helpers.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { type ChartData } from "~/libs/types/types.js";
import {
	type ContributorActivity,
	type ContributorGetAllItemResponseDto,
} from "~/pages/project/libs/types/types.js";

import { ContributorMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	activity?: ContributorActivity | undefined;
	contributor: ContributorGetAllItemResponseDto;
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	hasSplitPermission: boolean;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
	onSplit: (contributorId: number) => void;
};

const ContributorCard = ({
	activity,
	contributor,
	hasEditPermission,
	hasMergePermission,
	hasSplitPermission,
	onEdit,
	onMerge,
	onSplit,
}: Properties): JSX.Element => {
	const currentDate = getStartOfDay(new Date());
	const lastActivityDate = contributor.lastActivityDate
		? getStartOfDay(new Date(contributor.lastActivityDate))
		: null;

	const daysDifference = lastActivityDate
		? getDifferenceInDays(currentDate, lastActivityDate)
		: null;

	const lastUpdateLabel = lastActivityDate
		? `Updated ${getRelativeDate(lastActivityDate, currentDate)}`
		: null;

	const colorStatus =
		typeof daysDifference === "number"
			? getActivityIndicatorStatus(daysDifference)
			: null;

	const hasActivityIndicator = lastUpdateLabel !== null && colorStatus !== null;

	const hasActivityData = Boolean(activity);
	const activityData: ChartData = useMemo(
		() => activity?.map((commitsNumber) => ({ y: commitsNumber })) ?? [],
		[activity],
	);

	const handleEditClick = useCallback(() => {
		onEdit(contributor.id);
	}, [onEdit, contributor.id]);

	const handleMergeClick = useCallback(() => {
		onMerge(contributor.id);
	}, [onMerge, contributor.id]);

	const handleSplitClick = useCallback(() => {
		onSplit(contributor.id);
	}, [onSplit, contributor.id]);

	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
			{hasActivityIndicator && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
			{hasActivityData && <Chart data={activityData} />}
			<ContributorMenu
				contributorId={contributor.id}
				hasEditPermission={hasEditPermission}
				hasMergePermission={hasMergePermission}
				hasSplitPermission={hasSplitPermission}
				isSplitEnabled={
					contributor.gitEmails.length > MIN_GIT_EMAILS_LENGTH_FOR_SPLIT
				}
				onEdit={handleEditClick}
				onMerge={handleMergeClick}
				onSplit={handleSplitClick}
			/>
		</div>
	);
};

export { ContributorCard };
