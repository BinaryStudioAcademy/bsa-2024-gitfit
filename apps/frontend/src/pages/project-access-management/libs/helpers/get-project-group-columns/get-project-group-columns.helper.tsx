import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { ProjectGroupMenu } from "../../components/components.js";
import { type ProjectGroupRow } from "../../types/types.js";

const getProjectGroupColumns = (actions: {
	onDelete: (projectGroupId: number) => void;
	onEdit: (projectGroupId: number) => void;
	onMenuClose: () => void;
	onMenuOpen: () => void;
}): TableColumn<ProjectGroupRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
		size: 200,
	},
	{
		accessorFn: (projectGroup: ProjectGroupRow): string =>
			projectGroup.permissions.join(", "),
		header: "Permissions",
		size: 250,
	},
	{
		accessorKey: "userCount",
		header: "Users",
		size: 100,
	},
	{
		accessorFn: (projectGroup: ProjectGroupRow): string =>
			formatDate(new Date(projectGroup.createdAt), "d MMM yyyy HH:mm"),
		header: "Created At",
		size: 200,
	},
	{
		cell: ({ row: { original: projectGroup } }) => (
			<ProjectGroupMenu
				onDelete={actions.onDelete}
				onEdit={actions.onEdit}
				onMenuClose={actions.onMenuClose}
				onMenuOpen={actions.onMenuOpen}
				projectGroupId={projectGroup.id}
			/>
		),
		header: "",
		id: "menu",
		size: 60,
	},
];

export { getProjectGroupColumns };
