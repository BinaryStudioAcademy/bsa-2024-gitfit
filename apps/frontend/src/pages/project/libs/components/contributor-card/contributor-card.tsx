import { type ActivityChartData } from "~/libs/components/activity-chart/libs/types/types.js";
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
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
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
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
};

const ContributorCard = ({
	activity,
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

	const hasActivityData = Boolean(activity);
	const activityData: ActivityChartData = useMemo(
		() => activity?.map((commitsNumber) => ({ y: commitsNumber })) ?? [],
		[activity],
	);

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
