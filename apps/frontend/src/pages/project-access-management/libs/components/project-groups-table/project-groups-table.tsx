import { Table, TablePagination } from "~/libs/components/components.js";
import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";

import {
	getProjectGroupColumns,
	getProjectGroupRows,
} from "../../helpers/helpers.js";
import { type ProjectGroupRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	projectGroups: ProjectGroupGetAllItemResponseDto[];
	totalItemsCount: number;
};

const ProjectGroupsTable = ({
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	projectGroups,
	totalItemsCount,
}: Properties): JSX.Element => {
	const projectGroupColumns = getProjectGroupColumns();
	const projectGroupData: ProjectGroupRow[] =
		getProjectGroupRows(projectGroups);

	return (
		<div className={styles["groups-table"]}>
			<Table<ProjectGroupRow>
				columns={projectGroupColumns}
				data={projectGroupData}
			/>
			<TablePagination
				background={paginationBackground}
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={totalItemsCount}
			/>
		</div>
	);
};

export { ProjectGroupsTable };
