import { formatDistance } from "~/libs/helpers/helpers.js";

const getRelativeDateLabel = (
	currentDate: Date,
	lastActivityDate: Date | null,
): null | string => {
	if (!lastActivityDate) {
		return null;
	}

	return formatDistance(lastActivityDate, currentDate, {
		addSuffix: true,
	});
};

export { getRelativeDateLabel };
