import { type TableColumn } from "~/libs/types/types.js";

import { ContributorMenu } from "../components/components.js";
import { type ContributorRow } from "../types/types.js";

const getContributorColumns = (actions: {
	onMerge: (contributorId: number) => void;
}): TableColumn<ContributorRow>[] => [
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
		cell: ({ row: { original: contributor } }) => (
			<ContributorMenu
				contributorId={contributor.id}
				onMerge={actions.onMerge}
			/>
		),
		header: "",
		id: "menu",
		size: 60,
	},
];

export { getContributorColumns };
