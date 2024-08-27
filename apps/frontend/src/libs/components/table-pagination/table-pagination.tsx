import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormWatch,
	useMemo,
} from "~/libs/hooks/hooks.js";
import { calculateTotalPages } from "~/libs/hooks/use-pagination/libs/helpers/helpers.js";
import { type SelectOption } from "~/libs/types/types.js";

import { IconButton, Select } from "../components.js";
import {
	FIRST_PAGE,
	PAGE_INCREMENT,
	PAGE_SIZE_OPTIONS,
} from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	totalItems: number;
};

type PageSizeOption = SelectOption<number>;

type FormData = {
	pageSize: PageSizeOption;
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

	const { pageSize: changedPageSize } = useFormWatch({ control });

	useEffect(() => {
		const newPageSize = changedPageSize?.value as number;
		onPageSizeChange(newPageSize);
	}, [changedPageSize, onPageSizeChange]);

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
		<div
			className={getValidClassNames(
				styles["container"],
				styles["space-between"],
			)}
		>
			<p className={styles["no-margin"]}>{totalItems} items total</p>
			<div
				className={getValidClassNames(
					styles["pagination-container"],
					styles["space-between"],
				)}
			>
				<div
					className={getValidClassNames(
						styles["rows-per-page-container"],
						styles["space-between"],
					)}
				>
					<p className={styles["no-margin"]}>Rows per page:</p>
					<Select<FormData, PageSizeOption["value"]>
						control={control}
						isLabelHidden
						label="Rows per page"
						name="pageSize"
						options={PAGE_SIZE_OPTIONS}
						size="small"
					/>
				</div>
				<p className={styles["no-margin"]}>
					Page {page} of {totalPages}
				</p>
				<div
					className={getValidClassNames(
						styles["change-page-buttons-container"],
						styles["space-between"],
					)}
				>
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
