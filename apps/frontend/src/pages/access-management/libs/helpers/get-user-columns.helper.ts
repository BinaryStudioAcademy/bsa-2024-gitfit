import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type UserRow } from "../types/types.js";

const getUserColumns = (): TableColumn<UserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
			size: 100,
		},
		{
			accessorFn: (user: UserRow): string => user.groups.join(", "),
			header: "Groups",
			size: 200,
		},
		{
			accessorFn: (user: UserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
			size: 100,
		},
	];
};

export { getUserColumns };
