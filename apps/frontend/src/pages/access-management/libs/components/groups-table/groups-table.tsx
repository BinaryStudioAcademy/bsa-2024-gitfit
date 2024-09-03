import { Modal, Table } from "~/libs/components/components.js";
import { useCallback, useModal, useState } from "~/libs/hooks/hooks.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../helpers/helpers.js";
import { type GroupRow } from "../../types/types.js";
import { GroupsUpdateForm } from "../groups-update-form/groups-update-form.js";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
};

const GroupsTable = ({ groups }: Properties): JSX.Element => {
	const { isModalOpened, onModalClose, onModalOpen } = useModal();
	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups, {
		onEdit: (group: GroupGetAllItemResponseDto) => {
			setGroupToEdit(group);
			onModalOpen();
		},
	});

	const handleModalClose = useCallback(() => {
		setGroupToEdit(null);
		onModalClose();
	}, [onModalClose, setGroupToEdit]);

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />

			{groupToEdit && (
				<Modal
					isModalOpened={isModalOpened}
					onModalClose={handleModalClose}
					title="Update group"
				>
					<GroupsUpdateForm group={groupToEdit} onSubmit={handleModalClose} />
				</Modal>
			)}
		</>
	);
};

export { GroupsTable };
