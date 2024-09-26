import {
	ActivityIndicator,
	Chart,
	NavLink,
} from "~/libs/components/components.js";
import { MIN_GIT_EMAILS_LENGTH_FOR_SPLIT } from "~/libs/constants/constants.js";
import { AppRoute, QueryParameterName } from "~/libs/enums/enums.js";
import {
	configureQueryString,
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
	projectId: string;
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
	projectId,
}: Properties): JSX.Element => {
	const analyticsRoute = configureQueryString(AppRoute.ANALYTICS, [
		[QueryParameterName.PROJECT_ID, projectId],
		[QueryParameterName.SEARCH, contributor.name],
	]);

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
		<div className={styles["card-container"]}>
			<NavLink className={styles["card"] as string} to={analyticsRoute} />
			<span className={styles["name"]}>{contributor.name}</span>
			{hasActivityIndicator && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
			{hasActivityData && (
				<NavLink to={analyticsRoute}>
					<Chart data={activityData} isCursorPointer />
				</NavLink>
			)}
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
