import { type TableColumn } from "~/libs/types/types.js";

import { ContributorMenu } from "../../components/components.js";
import { type ContributorRow } from "../../types/types.js";

const getContributorColumns = (actions: {
	onEdit: (contributorId: number) => void;
}): TableColumn<ContributorRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
		size: 200,
	},
	{
		accessorFn: (contributor: ContributorRow): string =>
			contributor.gitEmails.join(", "),
		header: "Git Emails",
		size: 300,
	},
	{
		accessorFn: (contributor: ContributorRow): string =>
			contributor.projects.join(", "),
		header: "Projects",
		size: 300,
	},
	{
		cell: ({ row: { original: contributor } }) => (
			<ContributorMenu contributorId={contributor.id} onEdit={actions.onEdit} />
		),
		header: "",
		id: "menu",
		size: 60,
	},
];

export { getContributorColumns };
