import { QueryParameterName } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

import { FIRST_PAGE } from "./libs/constants/constants.js";
import {
	calculateTotalPages,
	getInitialPage,
	getInitialPageSize,
} from "./libs/helpers/helpers.js";

type UsePagination = (parameters: { totalItemsCount: number }) => {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
};

const usePagination: UsePagination = ({ totalItemsCount }) => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageQueryParameter = searchParameters.get(QueryParameterName.PAGE);
	const pageSizeQueryParameter = searchParameters.get(
		QueryParameterName.PAGE_SIZE,
	);

	const [pageSize, setPageSize] = useState<number>(() =>
		getInitialPageSize(pageSizeQueryParameter),
	);
	const [page, setPage] = useState<number>(() => {
		const initialTotalPages = calculateTotalPages(pageSize, totalItemsCount);

		return getInitialPage(pageQueryParameter, initialTotalPages);
	});

	useEffect(() => {
		setSearchParameters({
			[QueryParameterName.PAGE]: String(page),
			[QueryParameterName.PAGE_SIZE]: String(pageSize),
		});
	}, [page, pageSize, setSearchParameters]);

	const onPageChange = useCallback(
		(newPage: number) => {
			const totalPages = calculateTotalPages(pageSize, totalItemsCount);

			if (page >= FIRST_PAGE && page <= totalPages) {
				setPage(newPage);
			}
		},
		[page, pageSize, totalItemsCount],
	);

	const onPageSizeChange = useCallback(
		(newPageSize: number) => {
			setPageSize(newPageSize);

			const totalPages = calculateTotalPages(newPageSize, totalItemsCount);

			if (page > totalPages) {
				setPage(totalPages);
			}
		},
		[page, totalItemsCount],
	);

	return {
		onPageChange,
		onPageSizeChange,
		page,
		pageSize,
	};
};

export { usePagination };
