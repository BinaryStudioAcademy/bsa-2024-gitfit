import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type GroupRow } from "../types/types.js";

const getGroupColumns = (): TableColumn<GroupRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "permissions",
		header: "Permissions",
	},
	{
		accessorFn: (group: GroupRow): string =>
			formatDate(new Date(group.createdAt), "d MMM yyyy HH:mm"),
		header: "Created At",
	},
];

export { getGroupColumns };
