import { format } from "date-fns";

type DateFormat = "d MMM yyyy HH:mm" | "MMM d, yyyy";

const formatDate = (
	date: Date,
	dateFormat: DateFormat = "d MMM yyyy HH:mm",
): string => {
	return format(date, dateFormat);
};

export { formatDate };
