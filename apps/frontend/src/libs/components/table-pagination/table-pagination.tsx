import { useCallback, useMemo } from "~/libs/hooks/hooks.js";

import { ChangePageButton } from "./components/components.js";
import styles from "./styles.module.css";

const options = [
	{ label: "10", value: 10 },
	{ label: "25", value: 25 },
	{ label: "50", value: 50 },
];

type Properties = {
	onPageChange: (page: number) => void;
	onPerPageChange: (event: React.FormEvent<HTMLSelectElement>) => void;
	page: number;
	perPage: number;
	totalItems: number;
};

// TODO: replace this select with app select
// ===>
type MockSelectProperties = {
	onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
	options: { label: string; value: number | string }[];
};

const MockSelect = ({
	onChange,
	options,
}: MockSelectProperties): JSX.Element => {
	return (
		<select onChange={onChange}>
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
	onPerPageChange,
	page,
	perPage,
	totalItems,
}: Properties): JSX.Element => {
	const totalPages = useMemo(
		() => Math.ceil(totalItems / perPage),
		[totalItems, perPage],
	);

	const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
	const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

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
					<MockSelect onChange={onPerPageChange} options={options} />
				</div>
				<p>
					Page {page} of {totalPages}
				</p>
				<div className={styles["change-page-buttons"]}>
					<ChangePageButton
						disabled={!hasPreviousPage}
						icon="<<"
						onClick={handleFirstPageClick}
					/>
					<ChangePageButton
						disabled={!hasPreviousPage}
						icon="<"
						onClick={handlePreviousPageClick}
					/>
					<ChangePageButton
						disabled={!hasNextPage}
						icon=">"
						onClick={handleNextPageClick}
					/>
					<ChangePageButton
						disabled={!hasNextPage}
						icon=">>"
						onClick={handleLastPageClick}
					/>
				</div>
			</div>
		</div>
	);
};

export { TablePagination };
