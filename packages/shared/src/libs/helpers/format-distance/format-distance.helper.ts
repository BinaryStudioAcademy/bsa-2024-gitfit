import { formatDistance as formatDistanceToNow } from "date-fns";

const formatDistance = (
	date: Date,
	baseDate: Date,
	options?: { addSuffix?: boolean },
): string => {
	return formatDistanceToNow(date, baseDate, options);
};

export { formatDistance };
