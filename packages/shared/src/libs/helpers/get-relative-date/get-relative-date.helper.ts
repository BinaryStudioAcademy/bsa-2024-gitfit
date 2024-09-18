import { differenceInDays, formatDistance, isSameDay } from "date-fns";

const getRelativeDate = (date: Date, baseDate: Date): string => {
	const parsedDate = new Date(date);
	const parsedBaseDate = new Date(baseDate);
	const DIFF_IN_A_DAY = 1;

	if (isSameDay(parsedDate, parsedBaseDate)) {
		return "today";
	}

	if (differenceInDays(parsedBaseDate, parsedDate) === DIFF_IN_A_DAY) {
		return "yesterday";
	}

	return formatDistance(date, baseDate, { addSuffix: true });
};

export { getRelativeDate };
