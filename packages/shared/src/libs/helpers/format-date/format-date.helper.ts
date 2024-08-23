import { format } from "date-fns";

const formatDate = (createdAt: string): string => {
	return format(new Date(createdAt), "d MMM yyyy HH:mm");
};

export { formatDate };
