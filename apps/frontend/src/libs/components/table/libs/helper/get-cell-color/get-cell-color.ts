const getCellColor = (value: unknown): string => {
	if (value === "-") {
		return "cell-placeholder-color";
	}

	return "cell-text-color";
};

export { getCellColor };
