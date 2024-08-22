import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

type Parameters = {
	totalItems: number;
};

type ReturnType = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
};

const FIRST_PAGE = 1;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const QUERY_PARAMS = {
	page: "page",
	pageSize: "pageSize",
};
const calculateTotalPages = (pageSize: number, totalItems: number): number =>
	Math.ceil(totalItems / pageSize);

const usePagination = ({ totalItems }: Parameters): ReturnType => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	// There is no check for page and pageSize to be in available range
	const pageQueryParameter =
		Number(searchParameters.get(QUERY_PARAMS.page)) || DEFAULT_PAGE;
	const pageSizeQueryParameter =
		Number(searchParameters.get(QUERY_PARAMS.pageSize)) || DEFAULT_PAGE_SIZE;

	const [page, setPage] = useState<number>(pageQueryParameter);
	const [pageSize, setPageSize] = useState<number>(pageSizeQueryParameter);

	useEffect(() => {
		setSearchParameters({
			[QUERY_PARAMS.page]: String(page),
			[QUERY_PARAMS.pageSize]: String(pageSize),
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
