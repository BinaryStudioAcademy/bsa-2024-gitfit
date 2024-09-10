import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { type TableColumn } from "~/libs/types/types.js";

import { SelectRowCell } from "./components/components.js";
import styles from "./styles.module.css";

type BaseProperties<T> = {
	columns: TableColumn<T>[];
	data: T[];
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

	const hasData = data.length !== EMPTY_LENGTH;
	const isRowSelectable = typeof onRowSelect === "function";

	return (
		<div className={styles["table-container"]}>
			<table className={styles["table"]}>
				<thead className={styles["table-head"]}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className={styles["table-row"]} key={headerGroup.id}>
							{isRowSelectable && <th className={styles["table-header"]} />}
							{headerGroup.headers.map((header) => (
								<th
									className={styles["table-header"]}
									key={header.id}
									style={{
										width: header.column.columnDef.size,
									}}
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
				<tbody className={styles["table-body"]}>
					{hasData ? (
						table.getRowModel().rows.map((row) => (
							<tr className={styles["table-row"]} key={row.id}>
								{isRowSelectable && (
									<td className={styles["table-data"]}>
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
										style={{
											width: cell.column.columnDef.size,
										}}
									>
										{typeof cell.getValue() === "object"
											? (cell.getValue() as React.ReactNode)
											: flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
									</td>
								))}
							</tr>
						))
					) : (
						<tr className={styles["table-row"]}>
							<td className={styles["table-data"]} colSpan={columns.length}>
								<p className={styles["empty-placeholder"]}>
									There is nothing yet.
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
