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
};

const Table = <T extends object>({
	columns,
	data,
}: Properties<T>): JSX.Element => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table className={styles["table"]}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
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
						{row.getVisibleCells().map((cell) => (
							<td
								className={
									cell.column.id === "options" ? styles["options-column"] : ""
								}
								key={cell.id}
							>
								{typeof cell.getValue() === "object"
									? (cell.getValue() as React.ReactNode)
									: flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export { Table };
