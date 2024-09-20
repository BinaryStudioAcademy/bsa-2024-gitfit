import { FIRST_PAGE } from "../../constants/constants.js";

const getInitialPage = (
	pageQueryParameter: null | string,
	totalPages: number,
): number => {
	const page = Number(pageQueryParameter);

	if (Number.isInteger(page) && page <= totalPages && page >= FIRST_PAGE) {
		return page;
	}

	return FIRST_PAGE;
};

export { getInitialPage };
