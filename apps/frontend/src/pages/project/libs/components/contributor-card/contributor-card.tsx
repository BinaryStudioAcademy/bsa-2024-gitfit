import { ActivityIndicator } from "~/libs/components/components.js";
import {
	getDifferenceInDays,
	getRelativeDate,
} from "~/libs/helpers/helpers.js";
import { type ContributorGetAllItemResponseDto } from "~/pages/project/libs/types/types.js";
import { getActivityIndicatorStatus } from "~/pages/projects/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	contributor: ContributorGetAllItemResponseDto;
};

const ContributorCard = ({ contributor }: Properties): JSX.Element => {
	//TODO: start of the day
	const currentDate = new Date();
	const lastActivityDate = contributor.lastActivityDate
		? new Date(contributor.lastActivityDate)
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

	return (
		<div className={styles["card"]}>
			<span className={styles["name"]}>{contributor.name}</span>
			{hasActivityIndicator && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
		</div>
	);
};

export { ContributorCard };
