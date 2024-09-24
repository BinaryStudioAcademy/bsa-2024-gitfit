import { startOfDay } from "date-fns";

const getStartOfDay = (date: Date | string): Date => {
	return startOfDay(new Date(date));
};

export { getStartOfDay };
