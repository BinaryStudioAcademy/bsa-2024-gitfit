import { differenceInDays, formatDistance, isSameDay } from "date-fns";

const getRelativeDate = (date: Date, baseDate: Date): string => {
	const DIFF_IN_A_DAY = 1;

	if (isSameDay(date, baseDate)) {
		return "today";
	}

	if (differenceInDays(baseDate, date) === DIFF_IN_A_DAY) {
		return "yesterday";
	}

	return formatDistance(date, baseDate, { addSuffix: true });
};

export { getRelativeDate };
