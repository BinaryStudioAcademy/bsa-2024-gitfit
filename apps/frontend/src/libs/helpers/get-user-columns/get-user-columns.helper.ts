import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn, type TableUser } from "~/libs/types/types.js";

const getUserColumns = (): TableColumn<TableUser>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorFn: (user: TableUser): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
		},
	];
};

export { getUserColumns };
