import { differenceInHours, formatDistance } from "date-fns";

type SyncTimeResult = {
	hoursDifference?: number;
	label: string;
};

const HOURS_IN_A_DAY = 24;
const ONE_HOUR = 1;
const ZERO_HOURS = 0;

const getSyncTime = (date: Date, baseDate: Date): SyncTimeResult => {
	const hoursDifference = differenceInHours(baseDate, date);

	if (hoursDifference === ZERO_HOURS) {
		return { hoursDifference: ONE_HOUR, label: "1 hour ago" };
	}

	if (hoursDifference < HOURS_IN_A_DAY) {
		return {
			hoursDifference,
			label: `${String(hoursDifference)} ${hoursDifference === ONE_HOUR ? "hour" : "hours"} ago`,
		};
	}

	return {
		hoursDifference,
		label: formatDistance(date, baseDate, { addSuffix: true }),
	};
};

export { getSyncTime };
