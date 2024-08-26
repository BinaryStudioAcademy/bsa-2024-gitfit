import { DEFAULT_VALUES, FIRST_PAGE } from "../constants/constants.js";
import { isNumberInRange, parseQueryParameterToNumber } from "./helpers.js";

const getInitialPage = (
	pageQueryParameter: null | string,
	totalPages: number,
): number => {
	const pageParameter = parseQueryParameterToNumber(pageQueryParameter);

	if (
		pageParameter !== null &&
		isNumberInRange(pageParameter, { max: totalPages, min: FIRST_PAGE })
	) {
		return pageParameter;
	}

	return DEFAULT_VALUES.PAGE;
};

export { getInitialPage };
