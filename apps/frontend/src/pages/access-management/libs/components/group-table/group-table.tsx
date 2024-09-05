import { ConfirmationModal, Table } from "~/libs/components/components.js";
import { useCallback, useModal, useState } from "~/libs/hooks/hooks.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../helpers/helpers.js";
import { type GroupRow } from "../../types/types.js";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
	onDelete: (group: GroupGetAllItemResponseDto) => void;
};

const GroupTable = ({ groups, onDelete }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = useModal();
	const [groupToDelete, setGroupToDelete] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups, {
		onDelete: (group: GroupGetAllItemResponseDto) => {
			setGroupToDelete(group);
			onOpen();
		},
	});

	const handleModalClose = useCallback(() => {
		setGroupToDelete(null);
		onClose();
	}, [onClose]);

	const handleDeleteConfirm = useCallback(() => {
		if (groupToDelete !== null) {
			onDelete(groupToDelete);
			handleModalClose();
		}
	}, [groupToDelete, handleModalClose, onDelete]);

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />

			{groupToDelete && (
				<ConfirmationModal
					cancelLabel="Cancel"
					confirmationText="This group will be deleted. This action cannot be undone. Do you want to continue?"
					confirmLabel="Yes, Delete it"
					isModalOpened={isOpened}
					onConfirm={handleDeleteConfirm}
					onModalClose={handleModalClose}
					title="Are you sure?"
				/>
			)}
		</>
	);
};

export { GroupTable };
