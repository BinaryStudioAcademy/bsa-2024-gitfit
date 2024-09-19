import { Icon } from "~/libs/components/components.js";
import { type TableColumn } from "~/libs/types/types.js";

import { IsHiddenHeader } from "../components/components.js";
import { type ContributorRow } from "../types/types.js";

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
	{
		cell: ({ row: { original: contributor } }) =>
			contributor.isHidden ? (
				<Icon height={18} name="check" width={18} />
			) : null,
		header: IsHiddenHeader,
		id: "isHidden",
	},
];

export { getContributorColumns };
