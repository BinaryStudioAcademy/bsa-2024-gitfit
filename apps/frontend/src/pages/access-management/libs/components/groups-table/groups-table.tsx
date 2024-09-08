import {
	ConfirmationModal,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import {
	FIRST_PAGE,
	ITEMS_DECREMENT,
} from "~/libs/components/table-pagination/libs/constants/constants.js";
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

type Properties = {
	groups: GroupGetAllItemResponseDto[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	page: number;
	pageSize: number;
	totalItemsCount: number;
};

const GroupsTable = ({
	groups,
	onPageChange,
	onPageSizeChange,
	page,
	pageSize,
	totalItemsCount,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { isOpened, onClose, onOpen } = useModal();
	const [groupToDelete, setGroupToDelete] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const groupColumns = getGroupColumns({
		onDelete: (groupId: number) => {
			const group = groups.find(({ id }) => id === groupId);
			setGroupToDelete(group ?? null);

			onOpen();
		},
	});
	const groupData: GroupRow[] = getGroupRows(groups);

	const handleModalClose = useCallback(() => {
		setGroupToDelete(null);
		onClose();
	}, [onClose, setGroupToDelete]);

	const handleDeleteConfirm = useCallback(() => {
		if (groupToDelete) {
			void dispatch(groupActions.deleteById(groupToDelete.id))
				.unwrap()
				.then(() => {
					const newTotalCount = totalItemsCount - ITEMS_DECREMENT;
					const totalPages = Math.max(
						Math.ceil(newTotalCount / pageSize),
						FIRST_PAGE,
					);

					const newPage = Math.min(page, totalPages);
					onPageChange(newPage);
				});
		}

		handleModalClose();
	}, [
		dispatch,
		groupToDelete,
		handleModalClose,
		totalItemsCount,
		page,
		pageSize,
		onPageChange,
	]);

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />
			<TablePagination
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={totalItemsCount}
			/>

			{groupToDelete && (
				<ConfirmationModal
					content="The group will be deleted. This action cannot be undone. Do you want to continue?"
					isOpened={isOpened}
					onClose={handleModalClose}
					onConfirm={handleDeleteConfirm}
				/>
			)}
		</>
	);
};

export { GroupsTable };
