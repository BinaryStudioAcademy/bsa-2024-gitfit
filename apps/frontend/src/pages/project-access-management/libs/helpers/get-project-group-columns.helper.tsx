import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";

import { type ProjectGroupRow } from "../types/types.js";

const getProjectGroupColumns = (): TableColumn<ProjectGroupRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorFn: (projectGroup: ProjectGroupRow): string =>
			projectGroup.permissions.join(", "),
		header: "Permissions",
	},
	{
		accessorFn: (projectGroup: ProjectGroupRow): string =>
			formatDate(new Date(projectGroup.createdAt), "d MMM yyyy HH:mm"),
		header: "Created At",
	},
];

export { getProjectGroupColumns };
