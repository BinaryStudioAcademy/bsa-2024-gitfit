import { formatDistance } from "date-fns";

const getRelativeDate = (
	date: Date,
	baseDate: Date,
	options?: { addSuffix?: boolean },
): string => {
	return formatDistance(date, baseDate, options);
};

export { getRelativeDate };
