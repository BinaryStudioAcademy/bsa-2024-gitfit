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
	onPerPageChange: (perPage: number) => void;
	page: number;
	perPage: number;
};

const FIRST_PAGE = 1;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const QUERY_PARAMS = {
	page: "page",
	pageSize: "pageSize",
};

const usePagination = ({ totalItems }: Parameters): ReturnType => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	// There is no check for page and pageSize to be in available range
	const pageQueryParameter =
		Number(searchParameters.get(QUERY_PARAMS.page)) || DEFAULT_PAGE;
	const perPageQueryParameter =
		Number(searchParameters.get(QUERY_PARAMS.pageSize)) || DEFAULT_PAGE_SIZE;

	const [page, setPage] = useState<number>(pageQueryParameter);
	const [perPage, setPerPage] = useState<number>(perPageQueryParameter);

	useEffect(() => {
		setSearchParameters({
			[QUERY_PARAMS.page]: String(page),
			[QUERY_PARAMS.pageSize]: String(perPage),
		});
	}, [page, perPage, setSearchParameters]);

	const calculateTotalPages = useCallback(
		(perPage: number) => Math.ceil(totalItems / perPage),
		[totalItems],
	);

	const onPageChange = useCallback(
		(newPage: number) => {
			const totalPages = calculateTotalPages(perPage);

			if (page >= FIRST_PAGE && page <= totalPages) {
				setPage(newPage);
			}
		},
		[page, perPage],
	);

	const onPerPageChange = useCallback(
		(newPerPage: number) => {
			setPerPage(newPerPage);

			const totalPages = calculateTotalPages(newPerPage);

			if (page > totalPages) {
				setPage(totalPages);
			}
		},
		[page],
	);

	return {
		onPageChange,
		onPerPageChange,
		page,
		perPage,
	};
};

export { usePagination };
