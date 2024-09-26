import { Icon, Tooltip } from "~/libs/components/components.js";
import { MIN_GIT_EMAILS_LENGTH_FOR_SPLIT } from "~/libs/constants/constants.js";
import { type TableColumn } from "~/libs/types/types.js";

import { ContributorMenu } from "../../components/components.js";
import { type ContributorRow } from "../../types/types.js";
import styles from "./styles.module.css";

const getContributorColumns = (actions: {
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
	onSplit: (contributorId: number) => void;
}): TableColumn<ContributorRow>[] => [
	{
		accessorKey: "name",
		header: "Name",
		size: 200,
	},
	{
		cell: ({ row: { original: contributor } }): JSX.Element => {
			const gitEmails = contributor.gitEmails.join(", ");

			return (
				<div className={styles["git-email-cell-wrapper"]}>
					<Tooltip content={gitEmails} id={gitEmails}>
						{gitEmails}
					</Tooltip>
				</div>
			);
		},
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
		cell: ({ row: { original: contributor } }) =>
			contributor.hiddenAt ? (
				<Icon height={18} name="check" width={18} />
			) : (
				<></>
			),
		header: "Do Not Track",
		id: "hiddenAt",
		size: 140,
	},

	{
		cell: ({ row: { original: contributor } }) => (
			<ContributorMenu
				contributorId={contributor.id}
				isSplitEnabled={
					contributor.gitEmails.length > MIN_GIT_EMAILS_LENGTH_FOR_SPLIT
				}
				onEdit={actions.onEdit}
				onMerge={actions.onMerge}
				onSplit={actions.onSplit}
			/>
		),
		header: "",
		id: "menu",
		size: 60,
	},
];

export { getContributorColumns };
