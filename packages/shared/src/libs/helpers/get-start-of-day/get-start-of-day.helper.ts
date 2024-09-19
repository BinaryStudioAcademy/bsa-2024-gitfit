import { startOfDay } from "date-fns";

const getStartOfDay = (date: Date | number | string): Date => {
	return startOfDay(new Date(date));
};

export { getStartOfDay };
