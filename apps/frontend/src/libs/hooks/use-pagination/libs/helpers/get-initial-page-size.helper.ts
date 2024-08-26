import { DEFAULT_VALUES } from "../constants/constants.js";
import { isNumberInRange, parseQueryParameterToNumber } from "./helpers.js";

const getInitialPageSize = (pageSizeQueryParameter: null | string): number => {
	const pageSizeParameter = parseQueryParameterToNumber(pageSizeQueryParameter);

	if (
		pageSizeParameter !== null &&
		isNumberInRange(pageSizeParameter, { min: 1 })
	) {
		return pageSizeParameter;
	}

	return DEFAULT_VALUES.PAGE_SIZE;
};

export { getInitialPageSize };
