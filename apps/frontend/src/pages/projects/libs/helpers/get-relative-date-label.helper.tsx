import { getDifferenceInDays } from "~/libs/helpers/helpers.js";

import { ColorClass, ColorThreshold } from "../enums/enums.js";

type RelativeDateLabel = {
	colorClass: string;
	label: string;
} | null;

const getRelativeDateLabel = (
	lastActivityDate: null | string,
): RelativeDateLabel => {
	if (!lastActivityDate) {
		return null;
	}

	const currentDate = new Date();
	const lastActivity = new Date(lastActivityDate);
	const diffDays = getDifferenceInDays(currentDate, lastActivity);

	if (diffDays < ColorThreshold.GREEN) {
		return { colorClass: ColorClass.GREEN, label: "Updated today" };
	}

	if (diffDays < ColorThreshold.YELLOW) {
		return {
			colorClass: ColorClass.YELLOW,
			label: `Updated ${diffDays.toString()} days ago`,
		};
	}

	return {
		colorClass: ColorClass.RED,
		label: `Updated ${diffDays.toString()} days ago`,
	};
};

export { getRelativeDateLabel };
