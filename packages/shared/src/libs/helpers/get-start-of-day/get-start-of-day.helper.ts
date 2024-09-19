import { startOfDay } from "date-fns";

const getStartOfDay = (date: Date): Date => {
	return startOfDay(new Date(date));
};

export { getStartOfDay };
