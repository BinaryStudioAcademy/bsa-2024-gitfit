import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Loader } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useEffect, useRef, useState } from "~/libs/hooks/hooks.js";
import { type TableColumn } from "~/libs/types/types.js";

import { SelectRowCell } from "./libs/components/components.js";
import styles from "./styles.module.css";

type BaseProperties<T> = {
	columns: TableColumn<T>[];
	data: T[];
	emptyPlaceholder?: string;
	isFullHeight?: boolean;
	isLoading?: boolean;
	isScrollDisabled?: boolean;
};

type SelectableProperties<T> = {
	getRowId: (row: T) => number;
	onRowSelect: (rowId: number) => void;
	selectedRowIds: number[];
};

type Properties<T> =
	| BaseProperties<T>
	| (BaseProperties<T> & SelectableProperties<T>);

const Table = <T extends object>({
	columns,
	data,
	emptyPlaceholder = "There is nothing yet.",
	isFullHeight = false,
	isLoading,
	isScrollDisabled,
	...selectableProperties
}: Properties<T>): JSX.Element => {
	const { getRowId, onRowSelect, selectedRowIds } = selectableProperties as
		| Record<keyof SelectableProperties<T>, undefined>
		| SelectableProperties<T>;

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	const tbodyReference = useRef<HTMLTableSectionElement>(null);
	const [tableBodyHeight, setTableBodyHeight] = useState<null | number>(null);

	useEffect(() => {
		if (!isLoading && tbodyReference.current) {
			setTableBodyHeight(tbodyReference.current.clientHeight);
		}
	}, [isLoading]);

	const hasData = data.length !== EMPTY_LENGTH;
	const isRowSelectable = typeof onRowSelect === "function";

	return (
		<div className={styles["table-container"]}>
			<table
				className={getValidClassNames(
					styles["table"],
					isScrollDisabled && styles["table-no-scroll"],
					isFullHeight && styles["table-full-height"],
				)}
			>
				<thead className={styles["table-head"]}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className={styles["table-row"]} key={headerGroup.id}>
							{isRowSelectable && (
								<th
									className={getValidClassNames(
										styles["table-header"],
										styles["cell-min-content"],
									)}
								/>
							)}
							{headerGroup.headers.map((header) => (
								<th
									className={styles["table-header"]}
									key={header.id}
									style={{ width: header.column.columnDef.size }}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className={styles["table-body"]} ref={tbodyReference}>
					{isLoading && (
						<tr className={styles["table-row"]}>
							<td
								className={styles["table-loader"]}
								colSpan={columns.length}
								style={{ height: tableBodyHeight || "auto" }}
							>
								<Loader />
							</td>
						</tr>
					)}
					{!isLoading &&
						hasData &&
						table.getRowModel().rows.map((row) => (
							<tr
								className={styles["table-row"]}
								key={isRowSelectable ? getRowId(row.original) : row.id}
							>
								{isRowSelectable && (
									<td
										className={getValidClassNames(
											styles["table-data"],
											styles["cell-min-content"],
										)}
									>
										<SelectRowCell
											id={getRowId(row.original)}
											isChecked={selectedRowIds.includes(
												getRowId(row.original),
											)}
											onToggle={onRowSelect}
										/>
									</td>
								)}
								{row.getVisibleCells().map((cell) => (
									<td
										className={styles["table-data"]}
										key={cell.id}
										style={{ width: cell.column.columnDef.size }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}

					{!isLoading && !hasData && (
						<tr className={styles["table-row"]}>
							<td className={styles["table-data"]} colSpan={columns.length}>
								<p className={styles["empty-placeholder"]}>
									{emptyPlaceholder}
								</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export { Table };
