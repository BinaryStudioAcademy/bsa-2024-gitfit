import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { type TableColumn } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends object> = {
	columns: TableColumn<T>[];
	data: T[];
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
};

const Table = <T extends object>({
	columns,
	data,
	onRowSelect,
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
		<table className={styles["table"]}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{onRowSelect && <th />}
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{onRowSelect && (
							<td>
								<input
									id={row.id}
									onChange={handleRowSelect(Number(row.id))}
									type="checkbox"
								/>
							</td>
						)}
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export { Table };
