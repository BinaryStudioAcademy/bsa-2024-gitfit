import { getRelativeDate } from "~/libs/helpers/helpers.js";

const getRelativeDateLabel = (
	currentDate: Date,
	lastActivityDate: Date | null,
): null | string => {
	if (!lastActivityDate) {
		return null;
	}

	return getRelativeDate(lastActivityDate, currentDate);
};

export { getRelativeDateLabel };
