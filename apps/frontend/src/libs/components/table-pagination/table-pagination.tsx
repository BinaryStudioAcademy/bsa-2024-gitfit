import { useMemo } from "~/libs/hooks/hooks.js";

import { ChangePageButton } from "./components/components.js";
import styles from "./styles.module.css";

const options = [
	{ label: "10", value: 10 },
	{ label: "25", value: 25 },
	{ label: "50", value: 50 },
];

type Properties = {
	onFirstPageClick: () => void;
	onLastPageClick: () => void;
	onNextPageClick: () => void;
	onPreviousPageClick: () => void;
	onRowsPerPageChange: (event: React.FormEvent<HTMLSelectElement>) => void;
	page: number;
	rowsPerPage: number;
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

const TablePagination = ({
	onFirstPageClick,
	onLastPageClick,
	onNextPageClick,
	onPreviousPageClick,
	onRowsPerPageChange,
	page,
	rowsPerPage,
	totalItems,
}: Properties): JSX.Element => {
	const totalPages = useMemo(
		() => Math.ceil(totalItems / rowsPerPage),
		[totalItems, rowsPerPage],
	);

	const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
	const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

	return (
		<div className={styles["container"]}>
			<p>{totalItems} items total</p>
			<div className={styles["pagination-container"]}>
				<div className={styles["rows-per-page"]}>
					<p>Rows per page:</p>
					<MockSelect onChange={onRowsPerPageChange} options={options} />
				</div>
				<p>
					Page {page} of {totalPages}
				</p>
				<div className={styles["change-page-buttons"]}>
					<ChangePageButton
						disabled={!hasPreviousPage}
						icon="<<"
						onClick={onFirstPageClick}
					/>
					<ChangePageButton
						disabled={!hasPreviousPage}
						icon="<"
						onClick={onPreviousPageClick}
					/>
					<ChangePageButton
						disabled={!hasNextPage}
						icon=">"
						onClick={onNextPageClick}
					/>
					<ChangePageButton
						disabled={!hasNextPage}
						icon=">>"
						onClick={onLastPageClick}
					/>
				</div>
			</div>
		</div>
	);
};

export { TablePagination };
