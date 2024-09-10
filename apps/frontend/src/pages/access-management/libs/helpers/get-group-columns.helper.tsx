import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { GroupMenu } from "../components/components.js";
import { type GroupRow } from "../types/types.js";

const getGroupColumns = (
	onDelete: (groupId: number) => void,
): TableColumn<GroupRow>[] => [
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
		cell: ({ row: { original: group } }) => (
			<GroupMenu groupId={group.id} onDelete={onDelete} />
		),
		header: "",
		id: "menu",
		size: 0,
	},
];

export { getGroupColumns };
