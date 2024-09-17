const getCellColor = (value: unknown): string => {
	if (value === "-" && Number.isNaN(Number(value))) {
		return "cell-placeholder-color";
	}

	return "cell-text-color";
};

export { getCellColor };
