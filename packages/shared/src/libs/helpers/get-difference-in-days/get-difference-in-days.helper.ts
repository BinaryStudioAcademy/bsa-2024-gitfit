import { differenceInDays } from "date-fns";

const getDifferenceInDays = (dateLeft: Date, dateRight: Date): number => {
	return differenceInDays(dateLeft, dateRight);
};

export { getDifferenceInDays };
