import { differenceInDays, formatDistance } from "date-fns";

const getRelativeDate = (date: Date, baseDate: Date): string => {
	const LESS_THAN_DAY = 0;

	const daysDifference = differenceInDays(baseDate, date);

	if (daysDifference === LESS_THAN_DAY) {
		return "Updated today";
	}

	return formatDistance(date, baseDate);
};

export { getRelativeDate };
