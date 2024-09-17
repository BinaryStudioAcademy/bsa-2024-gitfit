import { getDifferenceInDays } from "~/libs/helpers/helpers.js";

import { ColorThreshold } from "../enums/enums.js";

const getActivityIndicatorStatus = (
	currentDate: Date,
	lastActivityDate: Date | null,
): "green" | "red" | "yellow" | null => {
	if (!lastActivityDate) {
		return null;
	}

	const diffDays = getDifferenceInDays(currentDate, lastActivityDate);

	if (diffDays < ColorThreshold.GREEN) {
		return "green";
	}

	if (diffDays < ColorThreshold.YELLOW) {
		return "yellow";
	}

	return "red";
};

export { getActivityIndicatorStatus };
