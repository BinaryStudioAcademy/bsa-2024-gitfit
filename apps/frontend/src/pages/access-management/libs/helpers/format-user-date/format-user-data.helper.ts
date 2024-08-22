const formatUserDate = (createdAt: string): string => {
	const date = new Date(createdAt);

	return date.toLocaleString("en-US", {
		day: "numeric",
		hour: "2-digit",
		hour12: false,
		minute: "2-digit",
		month: "short",
		year: "numeric",
	});
};

export { formatUserDate };
