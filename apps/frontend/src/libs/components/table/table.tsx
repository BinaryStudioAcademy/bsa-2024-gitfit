import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { type TableColumn } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Identifiable = {
	id: number;
};

type Properties<T> = {
	columns: TableColumn<T>[];
	data: T[];
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
	selectedIds?: Set<number>;
};

const Table = <T extends object>({
	columns,
	data,
	onRowSelect,
	selectedIds,
}: Properties<T>): JSX.Element => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleRowSelect = (
		rowId: number,
	): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			if (onRowSelect) {
				onRowSelect(rowId, event.target.checked);
			}
		};
	};

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
							{onRowSelect && (
								<td className={styles["table-data"]}>
									<input
										checked={selectedIds?.has(
											(row.original as unknown as Identifiable).id,
										)}
										id={(row.original as unknown as Identifiable).id.toString()}
										onChange={handleRowSelect(
											(row.original as unknown as Identifiable).id,
										)}
										type="checkbox"
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
