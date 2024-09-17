import { Table, TablePagination } from "~/libs/components/components.js";
import { useCallback, useMemo, useState } from "~/libs/hooks/hooks.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../helpers/helpers.js";
import { type GroupRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
	isLoading: boolean;
	onDelete: (id: number) => void;
	onEdit: (group: GroupGetAllItemResponseDto) => void;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	totalItemsCount: number;
};

const GroupsTable = ({
	groups,
	isLoading,
	onDelete,
	onEdit,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	totalItemsCount,
}: Properties): JSX.Element => {
	const handleEdit = useCallback(
		(groupId: number): void => {
			const group = groups.find(({ id }) => id === groupId);

			if (group) {
				onEdit(group);
			}
		},
		[groups, onEdit],
	);

	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	const handleMenuOpen = useCallback(() => {
		setIsMenuOpened(true);
	}, []);

	const handleMenuClose = useCallback(() => {
		setIsMenuOpened(false);
	}, []);

	const groupColumns = useMemo(
		() =>
			getGroupColumns({
				onDelete,
				onEdit: handleEdit,
				onMenuClose: handleMenuClose,
				onMenuOpen: handleMenuOpen,
			}),
		[handleMenuClose, handleMenuOpen, onDelete, handleEdit],
	);

	const groupData: GroupRow[] = getGroupRows(groups);

	return (
		<div className={styles["groups-table"]}>
			<Table<GroupRow>
				columns={groupColumns}
				data={groupData}
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

export { GroupsTable };
