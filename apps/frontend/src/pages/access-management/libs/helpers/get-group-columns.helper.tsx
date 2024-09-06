import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { GroupMenu } from "../components/components.js";
import { type GroupActions, type GroupRow } from "../types/types.js";

const getGroupColumns = (actions: GroupActions): TableColumn<GroupRow>[] => [
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
		accessorFn: (group: GroupRow): React.ReactNode => (
			<GroupMenu groupId={group.id} onDelete={actions.onDelete} />
		),
		header: "",
		id: "options",
	},
];

export { getGroupColumns };
