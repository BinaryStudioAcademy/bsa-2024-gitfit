import { type ColumnDef } from "@tanstack/react-table";

import { type User } from "../types/user.type.js";

const columns: ColumnDef<User>[] = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "createdAt", header: "Created At" },
];

export { columns };
