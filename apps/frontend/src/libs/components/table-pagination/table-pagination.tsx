import { useCallback, useMemo } from "~/libs/hooks/hooks.js";

import { IconButton } from "../components.js";
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

// TODO: replace this select with app select
// ===>
type MockSelectProperties = {
	onChange: (value: number) => void;
	options: { label: string; value: number }[];
};

const MockSelect = ({
	onChange,
	options,
}: MockSelectProperties): JSX.Element => {
	const handleOnChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onChange(Number(event.target.value));
		},
		[onChange],
	);

	return (
		<select onChange={handleOnChange}>
			{options.map(({ label, value }) => (
				<option key={label} value={value}>
					{label}
				</option>
			))}
		</select>
	);
};
// <===

const FIRST_PAGE = 1;
const PAGE_INCREMENT = 1;

const TablePagination = ({
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	totalItems,
}: Properties): JSX.Element => {
	const totalPages = useMemo(
		() => Math.ceil(totalItems / pageSize),
		[totalItems, pageSize],
	);

	const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
	const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

	const handlePageSizeChange = useCallback(
		(newPageSize: number) => {
			onPageSizeChange(newPageSize);
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
					<MockSelect onChange={handlePageSizeChange} options={options} />
				</div>
				<p>
					Page {page} of {totalPages}
				</p>
				<div className={styles["change-page-buttons"]}>
					<IconButton
						iconColor="textPrimary"
						iconName="leftDoubleArrow"
						isDisabled={!hasPreviousPage}
						label="Open first page"
						onClick={handleFirstPageClick}
						variant="outlined"
					/>
					<IconButton
						iconColor="textPrimary"
						iconName="leftArrow"
						isDisabled={!hasPreviousPage}
						label="Open previous page"
						onClick={handlePreviousPageClick}
						variant="outlined"
					/>
					<IconButton
						iconColor="textPrimary"
						iconName="rightArrow"
						isDisabled={!hasNextPage}
						label="Open next page"
						onClick={handleNextPageClick}
						variant="outlined"
					/>
					<IconButton
						iconColor="textPrimary"
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
