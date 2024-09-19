import { Icon } from "~/libs/components/components.js";
import { type TableColumn } from "~/libs/types/types.js";

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
		header: () => (
			<div style={{ alignItems: "center", display: "flex", gap: "4px" }}>
				Is Hidden <Icon height={15} name="circleQuestion" width={15} />
			</div>
		),
		id: "isHidden",
	},
];

export { getContributorColumns };
