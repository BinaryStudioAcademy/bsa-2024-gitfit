import { subDays } from "date-fns";

const subtractDays = (date: Date, days: number): Date => {
	return subDays(date, days);
};

export { subtractDays };
