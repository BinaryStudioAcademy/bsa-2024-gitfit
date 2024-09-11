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

type UsePagination = (parameters: {
	queryParameterPrefix: string;
	totalItemsCount: number;
}) => {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
};

const usePagination: UsePagination = ({
	queryParameterPrefix,
	totalItemsCount,
}) => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const pageParameterName = queryParameterPrefix + QueryParameterName.PAGE;
	const pageSizeParameterName =
		queryParameterPrefix + QueryParameterName.PAGE_SIZE;

	const NamedPageParameter = searchParameters.get(pageParameterName);
	const NamedPageSizeParameter = searchParameters.get(pageSizeParameterName);

	const [pageSize, setPageSize] = useState<number>(() =>
		getInitialPageSize(NamedPageSizeParameter),
	);
	const [page, setPage] = useState<number>(() => {
		const initialTotalPages = calculateTotalPages(pageSize, totalItemsCount);

		return getInitialPage(NamedPageParameter, initialTotalPages);
	});

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.set(pageParameterName, String(page));
		updatedSearchParameters.set(pageSizeParameterName, String(pageSize));
		setSearchParameters(updatedSearchParameters);
	}, [
		page,
		pageSize,
		setSearchParameters,
		pageParameterName,
		pageSizeParameterName,
	]);

	const onPageChange = useCallback(
		(newPage: number) => {
			const totalPages = calculateTotalPages(pageSize, totalItemsCount);
			const validPage = Math.max(FIRST_PAGE, Math.min(newPage, totalPages));

			setPage(validPage);
		},
		[page, pageSize, totalItemsCount],
	);

	useEffect(() => {
		onPageChange(page);
	}, [totalItemsCount]);

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
