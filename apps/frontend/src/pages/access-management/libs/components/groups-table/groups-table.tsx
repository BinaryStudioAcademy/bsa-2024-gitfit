import { Modal, Table, TablePagination } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useCallback,
	useModal,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
} from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../helpers/helpers.js";
import { type GroupRow } from "../../types/types.js";
import { GroupUpdateForm } from "../components.js";
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

	const { isOpened, onClose, onOpen } = useModal();
	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const handleModalClose = useCallback(() => {
		setGroupToEdit(null);
		onClose();
	}, [onClose, setGroupToEdit]);

	const handleUpdate = useCallback(
		(id: number, payload: GroupUpdateRequestDto) => {
			void dispatch(groupActions.update({ id, payload }));
			handleModalClose();
		},
		[dispatch, handleModalClose],
	);

	const groupColumns = getGroupColumns({
		onDelete: () => {},
		onEdit: (groupId: number) => {
			const group = groups.find(({ id }) => id === groupId);
			setGroupToEdit(group ?? null);

			onOpen();
		},
	});
	const groupData: GroupRow[] = getGroupRows(groups);

	return (
		<>
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
			</div>

			{groupToEdit && (
				<Modal
					isOpened={isOpened}
					onClose={handleModalClose}
					title="Update group"
				>
					<GroupUpdateForm group={groupToEdit} onSubmit={handleUpdate} />
				</Modal>
			)}
		</>
	);
};

export { GroupsTable };
