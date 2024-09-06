import { ConfirmationModal, Table } from "~/libs/components/components.js";
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
};

const GroupsTable = ({ groups }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { isOpened, onClose, onOpen } = useModal();
	const [groupToDelete, setGroupToDelete] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const validGroups = Array.isArray(groups) ? groups : [];

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(validGroups, {
		onDelete: (group: GroupGetAllItemResponseDto) => {
			setGroupToDelete(group);
			onOpen();
		},
	});

	const handleModalClose = useCallback(() => {
		setGroupToDelete(null);
		onClose();
	}, [onClose, setGroupToDelete]);

	const handleDeleteConfirm = useCallback(() => {
		if (groupToDelete) {
			void dispatch(groupActions.deleteById(groupToDelete.id));
		}

		handleModalClose();
	}, [dispatch, groupToDelete, handleModalClose]);

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />

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
