import { formatDistanceToNowStrict } from "date-fns";

const formatRelativeTime = (date: string): string => {
	return formatDistanceToNowStrict(new Date(date), {
		addSuffix: true,
	});
};

export { formatRelativeTime };
