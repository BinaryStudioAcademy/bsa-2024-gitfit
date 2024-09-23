import {
	ActivityChart,
	ActivityIndicator,
} from "~/libs/components/components.js";
import {
	getActivityIndicatorStatus,
	getDifferenceInDays,
	getRelativeDate,
	getStartOfDay,
} from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	activityLog?:
		| ActivityLogGetAllItemAnalyticsResponseDto["commitsNumber"]
		| undefined;
	contributor: ContributorGetAllItemResponseDto;
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
};

const ContributorCard = ({
	activityLog,
	contributor,
	hasEditPermission,
	hasMergePermission,
	onEdit,
	onMerge,
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

	const hasActivityData = Boolean(activityLog);
	const activityData =
		activityLog?.map((commitsNumber) => ({
			commitsNumber,
		})) ?? [];

	const handleEditClick = useCallback(() => {
		onEdit(contributor.id);
	}, [onEdit, contributor.id]);

	const handleMergeClick = useCallback(() => {
		onMerge(contributor.id);
	}, [onMerge, contributor.id]);

	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
			{hasActivityIndicator && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
			{hasActivityData && <ActivityChart data={activityData} />}
			<ContributorMenu
				contributorId={contributor.id}
				hasEditPermission={hasEditPermission}
				hasMergePermission={hasMergePermission}
				onEdit={handleEditClick}
				onMerge={handleMergeClick}
			/>
		</div>
	);
};

export { ContributorCard };
