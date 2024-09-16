import { addDays as addDaysToDate } from "date-fns";

const addDays = (date: Date, days: number): Date => {
	return addDaysToDate(date, days);
};

export { addDays };
