import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

import { FIRST_PAGE } from "./libs/constants/constants.js";
import { QueryParameter } from "./libs/enums/enums.js";
import {
	calculateTotalPages,
	getInitialPage,
	getInitialPageSize,
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
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageQueryParameter = searchParameters.get(QueryParameter.page);
	const pageSizeQueryParameter = searchParameters.get(QueryParameter.pageSize);

	const initialPageSize = getInitialPageSize(pageSizeQueryParameter);
	const initialTotalPages = calculateTotalPages(initialPageSize, totalItems);
	const initialPage = getInitialPage(pageQueryParameter, initialTotalPages);

	const [page, setPage] = useState<number>(initialPage);
	const [pageSize, setPageSize] = useState<number>(initialPageSize);

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
