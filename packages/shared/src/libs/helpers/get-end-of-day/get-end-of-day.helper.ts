import { endOfDay } from "date-fns";

const getEndOfDay = (date: Date | string): Date => {
	return endOfDay(new Date(date));
};

export { getEndOfDay };
