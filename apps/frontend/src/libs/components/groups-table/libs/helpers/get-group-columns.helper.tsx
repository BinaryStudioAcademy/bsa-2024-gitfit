import { GroupMenu } from "~/libs/components/components.js";
import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type GroupRow } from "../types/types.js";

const getGroupColumns = (actions: {
	onDelete: (groupId: number) => void;
	onEdit: (groupId: number) => void;
}): TableColumn<GroupRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorFn: (group: GroupRow): string => group.permissions.join(", "),
		header: "Permissions",
	},
	{
		accessorFn: (group: GroupRow): string =>
			formatDate(new Date(group.createdAt), "d MMM yyyy HH:mm"),
		header: "Created At",
	},
	{
		cell: ({ row: { original: group } }): React.ReactNode => (
			<GroupMenu
				groupId={group.id}
				onDelete={actions.onDelete}
				onEdit={actions.onEdit}
			/>
		),
		header: "",
		id: "menu",
		size: 0,
	},
];

export { getGroupColumns };
