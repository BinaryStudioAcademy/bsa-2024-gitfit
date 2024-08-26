const parseQueryParameterToNumber = (
	parameter: null | string,
): null | number => {
	if (!parameter) {
		return null;
	}

	const parsedNumber = Number(parameter);

	if (Number.isNaN(parsedNumber)) {
		return null;
	}

	return parsedNumber;
};

export { parseQueryParameterToNumber };
