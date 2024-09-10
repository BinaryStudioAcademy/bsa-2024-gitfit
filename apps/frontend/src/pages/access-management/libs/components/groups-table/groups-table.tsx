import {
	ConfirmationModal,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useCallback,
	useModal,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupGetAllItemResponseDto,
} from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../helpers/helpers.js";
import { type GroupRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	paginationBackground?: "primary" | "secondary";
	totalItemsCount: number;
};

const GroupsTable = ({
	groups,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	paginationBackground = "primary",
	totalItemsCount,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		isOpened: isDeleteModalOpen,
		onClose: onDeleteModalClose,
		onOpen: onDeleteModalOpen,
	} = useModal();

	const [groupId, setGroupId] = useState<null | number>(null);

	const onDelete = useCallback(
		(groupId: number) => {
			setGroupId(groupId);
			onDeleteModalOpen();
		},
		[onDeleteModalOpen],
	);

	const groupColumns = getGroupColumns(onDelete);

	const groupData: GroupRow[] = getGroupRows(groups);

	const handleModalClose = useCallback(() => {
		setGroupId(null);
		onDeleteModalClose();
	}, [onDeleteModalClose, setGroupId]);

	const handleDeleteConfirm = useCallback(() => {
		if (groupId !== null) {
			void dispatch(groupActions.deleteById(groupId));
		}

		handleModalClose();
	}, [dispatch, groupId, handleModalClose]);

	return (
		<div className={styles["groups-table"]}>
			<Table<GroupRow> columns={groupColumns} data={groupData} />
			<TablePagination
				background={paginationBackground}
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={totalItemsCount}
			/>

			{groupId && (
				<ConfirmationModal
					content="The group will be deleted. This action cannot be undone. Do you want to continue?"
					isOpened={isDeleteModalOpen}
					onClose={handleModalClose}
					onConfirm={handleDeleteConfirm}
				/>
			)}
		</div>
	);
};

export { GroupsTable };
