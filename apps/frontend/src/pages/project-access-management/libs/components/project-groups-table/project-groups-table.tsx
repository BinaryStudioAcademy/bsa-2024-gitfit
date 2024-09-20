import { Table, TablePagination } from "~/libs/components/components.js";
import { useCallback, useMemo, useState } from "~/libs/hooks/hooks.js";
import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";

import {
	getProjectGroupColumns,
	getProjectGroupRows,
} from "../../helpers/helpers.js";
import { type ProjectGroupRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onDelete: (id: number) => void;
	onEdit: (group: ProjectGroupGetAllItemResponseDto) => void;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	projectGroups: ProjectGroupGetAllItemResponseDto[];
	totalItemsCount: number;
};

const ProjectGroupsTable = ({
	isLoading,
	onDelete,
	onEdit,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	projectGroups,
	totalItemsCount,
}: Properties): JSX.Element => {
	const handleEdit = useCallback(
		(projectGroupId: number): void => {
			const projectGroup = projectGroups.find(
				({ id }) => id === projectGroupId,
			);

			if (projectGroup) {
				onEdit(projectGroup);
			}
		},
		[projectGroups, onEdit],
	);

	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	const handleMenuOpen = useCallback(() => {
		setIsMenuOpened(true);
	}, []);

	const handleMenuClose = useCallback(() => {
		setIsMenuOpened(false);
	}, []);
	const projectGroupColumns = useMemo(
		() =>
			getProjectGroupColumns({
				onDelete,
				onEdit: handleEdit,
				onMenuClose: handleMenuClose,
				onMenuOpen: handleMenuOpen,
			}),
		[onDelete, handleMenuClose, handleMenuOpen, handleEdit],
	);
	const projectGroupData: ProjectGroupRow[] =
		getProjectGroupRows(projectGroups);

	return (
		<div className={styles["groups-table"]}>
			<Table<ProjectGroupRow>
				columns={projectGroupColumns}
				data={projectGroupData}
				isLoading={isLoading}
				isScrollDisabled={isMenuOpened}
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
