import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from "../../constants/constants.js";

const getInitialPageSize = (pageSizeQueryParameter: null | string): number => {
	const pageSize = Number(pageSizeQueryParameter);

	if (Number.isInteger(pageSize) && pageSize >= FIRST_PAGE) {
		return pageSize;
	}

	return DEFAULT_PAGE_SIZE;
};

export { getInitialPageSize };
