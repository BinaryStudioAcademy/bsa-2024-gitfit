import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";
import { type UserRow } from "~/pages/access-management/libs/types/user-row.type.js";

const getUserColumns = (): TableColumn<UserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorFn: (user: UserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
		},
	];
};

export { getUserColumns };
