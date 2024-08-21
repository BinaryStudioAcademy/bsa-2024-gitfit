import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";

type Parameters = {
	startingPage: number;
	startingRowsPerPage: number;
	totalItems: number;
};

type ReturnType = {
	changeRowsPerPage: (value: number) => void;
	openFirstPage: () => void;
	openLastPage: () => void;
	openNextPage: () => void;
	openPreviousPage: () => void;
	page: number;
	rowsPerPage: number;
};

const FIRST_PAGE = 1;
const PAGE_INCREMENT = 1;

const useTablePagination = ({
	startingPage,
	startingRowsPerPage,
	totalItems,
}: Parameters): ReturnType => {
	const [page, setPage] = useState<number>(startingPage);
	const [rowsPerPage, setRowsPerPage] = useState<number>(startingRowsPerPage);

	const totalPages = useMemo(
		() => Math.ceil(totalItems / rowsPerPage),
		[totalItems, rowsPerPage],
	);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}

		if (page < FIRST_PAGE) {
			setPage(FIRST_PAGE);
		}
	}, [totalPages]);

	const changeRowsPerPage = useCallback((value: number) => {
		setRowsPerPage(value);
	}, []);

	const openFirstPage = useCallback(() => {
		setPage(FIRST_PAGE);
	}, []);
	const openLastPage = useCallback(() => {
		setPage(totalPages);
	}, [totalPages]);

	const openNextPage = useCallback(() => {
		if (page < totalPages) {
			setPage(page + PAGE_INCREMENT);
		}
	}, [page, totalPages]);

	const openPreviousPage = useCallback(() => {
		if (page > FIRST_PAGE) {
			setPage(page - PAGE_INCREMENT);
		}
	}, [page]);

	return {
		changeRowsPerPage,
		openFirstPage,
		openLastPage,
		openNextPage,
		openPreviousPage,
		page,
		rowsPerPage,
	};
};

export { useTablePagination };
