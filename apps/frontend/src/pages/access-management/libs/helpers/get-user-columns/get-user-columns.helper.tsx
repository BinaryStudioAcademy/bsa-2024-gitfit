import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { UserMenu } from "../../components/components.js";
import { type UserRow } from "../../types/types.js";

const getUserColumns = (actions: {
	onDelete: (userId: number) => void;
}): TableColumn<UserRow>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
			size: 300,
		},
		{
			accessorFn: (user: UserRow): string => user.groups.join(", "),
			header: "Groups",
			size: 400,
		},
		{
			accessorFn: (user: UserRow): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
			size: 200,
		},
		{
			cell: ({ row: { original: user } }) => (
				<UserMenu onDelete={actions.onDelete} userId={user.id} />
			),
			header: "",
			id: "menu",
			size: 60,
		},
	];
};

export { getUserColumns };
