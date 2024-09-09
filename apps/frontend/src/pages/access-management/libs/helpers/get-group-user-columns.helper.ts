import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type GroupUserRow } from "../types/types.js";

const getGroupUserColumns = (): TableColumn<GroupUserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorFn: (user: GroupUserRow): string => user.groups.join(", "),
			header: "Groups",
		},
		{
			accessorFn: (user: GroupUserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
		},
	];
};

export { getGroupUserColumns };
