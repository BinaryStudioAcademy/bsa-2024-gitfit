import { type ColumnDef } from "@tanstack/react-table";

import { type User } from "../types/types.js";

const TABLE_COLUMNS: ColumnDef<User>[] = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "createdAt", header: "Created At" },
];

export { TABLE_COLUMNS };
