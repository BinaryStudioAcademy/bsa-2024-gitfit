import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
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

	const hasData = data.length !== EMPTY_LENGTH;

	return (
		<div className={styles["table-container"]}>
			<table className={styles["table"]}>
				<thead className={styles["table-head"]}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className={styles["table-row"]} key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className={getValidClassNames(
										styles["table-header"],
										header.id === "options" && styles["options-column"],
									)}
									key={header.id}
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
								{row.getVisibleCells().map((cell) => (
									<td
										className={getValidClassNames(
											styles["table-data"],
											cell.column.id === "options" && styles["options-column"],
										)}
										key={cell.id}
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
