import { format } from "date-fns";

type DateFormat = string;

const formatDate = (date: Date, dateFormat: DateFormat): string => {
	return format(date, dateFormat);
};

export { formatDate };
