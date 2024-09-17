import { format } from "date-fns";

type DateFormat = "d MMM yyyy HH:mm" | "EEEEEE" | "MMM d, yyyy" | "yyyy-MM-dd";

const formatDate = (date: Date, dateFormat: DateFormat): string => {
	return format(date, dateFormat);
};

export { formatDate };
