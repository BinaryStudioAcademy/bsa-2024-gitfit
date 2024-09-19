import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { GroupMenu } from "../../components/components.js";
import { type GroupRow } from "../../types/types.js";

const getGroupColumns = (actions: {
	onDelete: (groupId: number) => void;
	onEdit: (groupId: number) => void;
	onMenuClose: () => void;
	onMenuOpen: () => void;
}): TableColumn<GroupRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
		size: 200,
	},
	{
		accessorFn: (group: GroupRow): string => group.permissions.join(", "),
		header: "Permissions",
		size: 250,
	},
	{
		accessorKey: "userCount",
		header: "Users",
		size: 100,
	},
	{
		accessorFn: (group: GroupRow): string =>
			formatDate(new Date(group.createdAt), "d MMM yyyy HH:mm"),
		header: "Created At",
		size: 200,
	},
	{
		cell: ({ row: { original: group } }) => (
			<GroupMenu
				groupId={group.id}
				onDelete={actions.onDelete}
				onEdit={actions.onEdit}
				onMenuClose={actions.onMenuClose}
				onMenuOpen={actions.onMenuOpen}
			/>
		),
		header: "",
		id: "menu",
		size: 60,
	},
];

export { getGroupColumns };
