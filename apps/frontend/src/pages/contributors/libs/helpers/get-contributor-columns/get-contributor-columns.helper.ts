import { type TableColumn } from "~/libs/types/types.js";

import { type ContributorRow } from "../../types/types.js";

const getContributorColumns = (): TableColumn<ContributorRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorFn: (contributor: ContributorRow): string =>
			contributor.gitEmails.join(", "),
		header: "Git Emails",
	},
	{
		accessorFn: (contributor: ContributorRow): string =>
			contributor.projects.join(", "),
		header: "Projects",
	},
];

export { getContributorColumns };
