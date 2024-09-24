const configureQueryString = (
	baseUrl: string,
	parameters?: ConstructorParameters<typeof URLSearchParams>[number],
): string => {
	if (!parameters) {
		return baseUrl;
	}

	const searchParameters = new URLSearchParams(parameters);

	return `${baseUrl}?${searchParameters.toString()}`;
};

export { configureQueryString };
