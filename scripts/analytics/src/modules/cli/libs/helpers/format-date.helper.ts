function formatDate(date: Date): string {
	const MONTH_OFFSET = 1;
	const MIN_LENGTH = 2;

	const year = String(date.getFullYear());
	const month = String(date.getMonth() + MONTH_OFFSET).padStart(
		MIN_LENGTH,
		"0",
	);
	const day = String(date.getDate()).padStart(MIN_LENGTH, "0");

	return `${year}-${month}-${day}`;
}

export { formatDate };
