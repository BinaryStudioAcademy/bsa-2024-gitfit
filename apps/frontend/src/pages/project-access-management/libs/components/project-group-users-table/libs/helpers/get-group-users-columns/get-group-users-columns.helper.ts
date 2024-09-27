import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";
import { type UserRow } from "~/pages/project-access-management/libs/types/types.js";

const getGroupUsersColumns = (): TableColumn<UserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
			size: 160,
		},
		{
			accessorFn: (user: UserRow): string => user.projectGroups.join(", "),
			header: "Groups",
			size: 220,
		},
		{
			accessorFn: (user: UserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
			size: 160,
		},
	];
};

export { getGroupUsersColumns };
