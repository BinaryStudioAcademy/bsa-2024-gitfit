import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

const formatRelativeLocale = {
	lastWeek: "'Updated last' eeee",
	other: "'Updated on' P",
	today: "'Updated today'",
	yesterday: "'Updated yesterday'",
};

const locale = {
	...enUS,
	formatRelative: (token: string): string =>
		formatRelativeLocale[token as keyof typeof formatRelativeLocale],
};

const getRelativeDate = (date: Date, baseDate: Date): string => {
	return formatRelative(date, baseDate, { locale });
};

export { getRelativeDate };
