import { useCallback, useMemo, useState } from "~/libs/hooks/hooks.js";

import { FIRST_PAGE, PAGE_INCREMENT } from "./libs/constants/constants.js";

type UseInfiniteScroll = (parameters: {
	currentItemsCount: number;
	onLoading: (page: number, pageSize: number) => void;
	pageSize: number;
	totalItemsCount: number;
}) => {
	hasNextPage: boolean;
	onNextPage: () => void;
	onPageReset: () => void;
};

const useInfiniteScroll: UseInfiniteScroll = ({
	currentItemsCount,
	onLoading,
	pageSize,
	totalItemsCount,
}) => {
	const [page, setPage] = useState<number>(FIRST_PAGE);

	const hasNextPage = useMemo(
		() => currentItemsCount < totalItemsCount,
		[totalItemsCount, currentItemsCount],
	);

	const onPageChange = useCallback(
		(newPage: number) => {
			onLoading(newPage, pageSize);
			setPage(newPage);
		},
		[setPage, onLoading],
	);

	const onNextPage = useCallback(() => {
		if (hasNextPage) {
			onPageChange(page + PAGE_INCREMENT);
		}
	}, [onPageChange, hasNextPage, page]);

	const onPageReset = useCallback(() => {
		onPageChange(FIRST_PAGE);
	}, [onPageChange]);

	return {
		hasNextPage,
		onNextPage,
		onPageReset,
	};
};

export { useInfiniteScroll };
