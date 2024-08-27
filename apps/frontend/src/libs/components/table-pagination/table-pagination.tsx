import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { calculateTotalPages } from "~/libs/hooks/use-pagination/libs/helpers/helpers.js";

import { IconButton, Select } from "../components.js";
import {
	FIRST_PAGE,
	PAGE_INCREMENT,
	PAGE_SIZE_OPTIONS,
} from "./libs/constants/constants.js";
import { type FormData, type PageSizeOption } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	totalItems: number;
};

const TablePagination = ({
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	totalItems,
}: Properties): JSX.Element => {
	const { control } = useAppForm<FormData>({
		defaultValues: {
			pageSize: { label: String(pageSize), value: pageSize },
		},
	});

	const totalPages = useMemo(
		() => calculateTotalPages(pageSize, totalItems),
		[totalItems, pageSize],
	);

	const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
	const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

	const handlePageSizeChange = useCallback(
		(option: PageSizeOption) => {
			onPageSizeChange(option.value);
		},
		[onPageSizeChange],
	);

	const handleFirstPageClick = useCallback(() => {
		onPageChange(FIRST_PAGE);
	}, [onPageChange]);

	const handlePreviousPageClick = useCallback(() => {
		onPageChange(page - PAGE_INCREMENT);
	}, [onPageChange, page]);

	const handleNextPageClick = useCallback(() => {
		onPageChange(page + PAGE_INCREMENT);
	}, [onPageChange, page]);

	const handleLastPageClick = useCallback(() => {
		onPageChange(totalPages);
	}, [onPageChange, totalPages]);

	return (
		<div className={styles["container"]}>
			<p className={styles["total-items-text"]}>{totalItems} items total</p>
			<div className={styles["pagination-container"]}>
				<div className={styles["rows-per-page"]}>
					<p className={styles["rows-per-page-text"]}>Rows per page:</p>
					<Select<FormData, PageSizeOption["value"]>
						control={control}
						isLabelHidden
						label="Rows per page"
						name="pageSize"
						onChange={handlePageSizeChange}
						options={PAGE_SIZE_OPTIONS}
						size="small"
					/>
				</div>
				<p className={styles["page-text"]}>
					Page {page} of {totalPages}
				</p>
				<div className={styles["change-page-buttons"]}>
					<IconButton
						iconName="leftDoubleArrow"
						isDisabled={!hasPreviousPage}
						label="Open first page"
						onClick={handleFirstPageClick}
						variant="outlined"
					/>
					<IconButton
						iconName="leftArrow"
						isDisabled={!hasPreviousPage}
						label="Open previous page"
						onClick={handlePreviousPageClick}
						variant="outlined"
					/>
					<IconButton
						iconName="rightArrow"
						isDisabled={!hasNextPage}
						label="Open next page"
						onClick={handleNextPageClick}
						variant="outlined"
					/>
					<IconButton
						iconName="rightDoubleArrow"
						isDisabled={!hasNextPage}
						label="Open last page"
						onClick={handleLastPageClick}
						variant="outlined"
					/>
				</div>
			</div>
		</div>
	);
};

export { TablePagination };
