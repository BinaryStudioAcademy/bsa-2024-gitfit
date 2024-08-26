import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { calculateTotalPages } from "~/libs/hooks/use-pagination/libs/helpers/helpers.js";
import { type SelectOption } from "~/libs/types/types.js";

import { IconButton, Select } from "../components.js";
import styles from "./styles.module.css";

const options = [
	{ label: "10", value: 10 },
	{ label: "25", value: 25 },
	{ label: "50", value: 50 },
];

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	totalItems: number;
};

type FormData = {
	pageSize: SelectOption<number>;
};

const FIRST_PAGE = 1;
const PAGE_INCREMENT = 1;

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
		(option: SelectOption<number>) => {
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
			<p>{totalItems} items total</p>
			<div className={styles["pagination-container"]}>
				<div className={styles["rows-per-page"]}>
					<p>Rows per page:</p>
					<Select<FormData, number>
						control={control}
						isLabelVissible={false}
						label="Rows per page"
						name="pageSize"
						onChange={handlePageSizeChange}
						options={options}
						placeholder=""
						variant="small"
					/>
				</div>
				<p>
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
