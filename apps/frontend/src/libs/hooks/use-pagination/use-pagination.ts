import { useCallback, useState } from "~/libs/hooks/hooks.js";

type Parameters = {
	pageQueryParameter: number;
	perPageQueryParameter: number;
	totalItems: number;
};

type ReturnType = {
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: number) => void;
	page: number;
	perPage: number;
};

const FIRST_PAGE = 1;

const usePagination = ({
	pageQueryParameter,
	perPageQueryParameter,
	totalItems,
}: Parameters): ReturnType => {
	const [page, setPage] = useState<number>(pageQueryParameter);
	const [perPage, setPerPage] = useState<number>(perPageQueryParameter);

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
