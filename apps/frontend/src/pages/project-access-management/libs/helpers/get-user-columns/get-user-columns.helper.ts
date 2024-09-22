import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type UserRow } from "../../types/types.js";

const getUserColumns = (): TableColumn<UserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
			size: 300,
		},
		{
			accessorFn: (user: UserRow): string => user.projectGroups.join(", "),
			header: "Groups",
			size: 400,
		},
		{
			accessorFn: (user: UserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
			size: 200,
		},
	];
};

export { getUserColumns };
