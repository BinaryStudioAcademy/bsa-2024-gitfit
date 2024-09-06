import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { type TableColumn } from "~/libs/types/types.js";

import { SelectRowCell } from "./components/select-row-cell/select-row-cell.js";
import styles from "./styles.module.css";

type Properties<T> = {
	columns: TableColumn<T>[];
	data: T[];
	getRowId?: (row: T) => number;
	name?: string;
	onRowSelect?: (rowId: number) => void;
	selectedIds?: number[];
};

const Table = <T extends object>({
	columns,
	data,
	getRowId,
	name,
	onRowSelect,
	selectedIds,
}: Properties<T>): JSX.Element => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className={styles["table-container"]}>
			<table className={styles["table"]}>
				<thead className={styles["table-head"]}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className={styles["table-row"]} key={headerGroup.id}>
							{onRowSelect && <th className={styles["table-header"]} />}
							{headerGroup.headers.map((header) => (
								<th className={styles["table-header"]} key={header.id}>
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
					{table.getRowModel().rows.map((row) => (
						<tr className={styles["table-row"]} key={row.id}>
							{onRowSelect && selectedIds && name && getRowId && (
								<td className={styles["table-data"]}>
									<SelectRowCell
										id={getRowId(row.original)}
										isChecked={selectedIds.includes(getRowId(row.original))}
										name={name}
										onToggle={onRowSelect}
									/>
								</td>
							)}
							{row.getVisibleCells().map((cell) => (
								<td className={styles["table-data"]} key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export { Table };
