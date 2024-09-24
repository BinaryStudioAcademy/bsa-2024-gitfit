import { endOfDay } from "date-fns";

const getEndOfDay = (date: Date): Date => {
	return endOfDay(new Date(date));
};

export { getEndOfDay };
