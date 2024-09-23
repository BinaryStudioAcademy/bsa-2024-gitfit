import { ActivityIndicator } from "~/libs/components/components.js";
import { SINGLE_ITEM } from "~/libs/constants/constants.js";
import {
	getActivityIndicatorStatus,
	getDifferenceInDays,
	getRelativeDate,
	getStartOfDay,
} from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";

import { ContributorMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
	onSplit: (contributorId: number) => void;
};

const ContributorCard = ({
	contributor,
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
			<ContributorMenu
				contributorId={contributor.id}
				isSplitEnabled={contributor.gitEmails.length > SINGLE_ITEM}
				onEdit={handleEditClick}
				onMerge={handleMergeClick}
				onSplit={handleSplitClick}
			/>
		</div>
	);
};

export { ContributorCard };
