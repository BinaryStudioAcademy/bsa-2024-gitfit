import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

import { DEFAULT_VALUES, FIRST_PAGE } from "./libs/constants/constants.js";
import { QueryParameter } from "./libs/enums/enums.js";
import {
	calculateTotalPages,
	isNumberInRange,
	parseQueryParameterToNumber,
} from "./libs/helpers/helpers.js";

type Parameters = {
	totalItems: number;
};

type ReturnType = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
};

const usePagination = ({ totalItems }: Parameters): ReturnType => {
	const [page, setPage] = useState<number>(DEFAULT_VALUES.PAGE);
	const [pageSize, setPageSize] = useState<number>(DEFAULT_VALUES.PAGE_SIZE);

	const [searchParameters, setSearchParameters] = useSearchParams();
	const pageQueryParameter = searchParameters.get(QueryParameter.page);
	const pageSizeQueryParameter = searchParameters.get(QueryParameter.pageSize);

	useEffect(() => {
		const pageParameter = parseQueryParameterToNumber(pageQueryParameter);
		let pageSizeParameter = parseQueryParameterToNumber(pageSizeQueryParameter);

		if (
			pageSizeParameter !== null &&
			isNumberInRange(pageSizeParameter, { min: 1 })
		) {
			setPageSize(pageSizeParameter);
		} else {
			pageSizeParameter = DEFAULT_VALUES.PAGE_SIZE;
		}

		const totalPages = calculateTotalPages(pageSizeParameter, totalItems);

		if (
			pageParameter !== null &&
			isNumberInRange(pageParameter, { max: totalPages, min: FIRST_PAGE })
		) {
			setPage(pageParameter);
		}
	}, [pageQueryParameter, pageSizeQueryParameter]);

	useEffect(() => {
		setSearchParameters({
			[QueryParameter.page]: String(page),
			[QueryParameter.pageSize]: String(pageSize),
		});
	}, [page, pageSize, setSearchParameters]);

	const onPageChange = useCallback(
		(newPage: number) => {
			const totalPages = calculateTotalPages(pageSize, totalItems);

			if (page >= FIRST_PAGE && page <= totalPages) {
				setPage(newPage);
			}
		},
		[page, pageSize, totalItems],
	);

	const onPageSizeChange = useCallback(
		(newPageSize: number) => {
			setPageSize(newPageSize);

			const totalPages = calculateTotalPages(newPageSize, totalItems);

			if (page > totalPages) {
				setPage(totalPages);
			}
		},
		[page, totalItems],
	);

	return {
		onPageChange,
		onPageSizeChange,
		page,
		pageSize,
	};
};

export { usePagination };
