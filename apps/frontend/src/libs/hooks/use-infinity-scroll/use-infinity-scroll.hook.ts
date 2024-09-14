import { useCallback, useMemo, useState } from "~/libs/hooks/hooks.js";

import { FIRST_PAGE, PAGE_INCREMENT } from "./libs/constants/constants.js";

type UseInfiniteScroll = (parameters: {
	pageSize: number;
	totalItemsCount: number;
}) => {
	hasNextPage: boolean;
	onPageChange: () => void;
	onPageReset: () => void;
	page: number;
	pageSize: number;
};

const useInfiniteScroll: UseInfiniteScroll = ({
	pageSize,
	totalItemsCount,
}) => {
	const [page, setPage] = useState<number>(FIRST_PAGE);

	const hasNextPage = useMemo(
		() => (page + PAGE_INCREMENT) * pageSize < totalItemsCount,
		[totalItemsCount, pageSize, page],
	);

	const onPageChange = useCallback(() => {
		if (hasNextPage) {
			setPage((previousPage) => previousPage + PAGE_INCREMENT);
		}
	}, [setPage, hasNextPage]);

	const onPageReset = useCallback(() => {
		setPage(FIRST_PAGE);
	}, [setPage]);

	return {
		hasNextPage,
		onPageChange,
		onPageReset,
		page,
		pageSize,
	};
};

export { useInfiniteScroll };
