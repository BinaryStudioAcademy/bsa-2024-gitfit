import { getDifferenceInDays } from "~/libs/helpers/helpers.js";

import { ActivityIndicatorThreshold } from "../enums/enums.js";

const getActivityIndicatorStatus = (
	currentDate: Date,
	lastActivityDate: Date | null,
): "green" | "red" | "yellow" | null => {
	if (!lastActivityDate) {
		return null;
	}

	const diffDays = getDifferenceInDays(currentDate, lastActivityDate);

	if (diffDays < ActivityIndicatorThreshold.GREEN) {
		return "green";
	}

	if (diffDays < ActivityIndicatorThreshold.YELLOW) {
		return "yellow";
	}

	return "red";
};

export { getActivityIndicatorStatus };
