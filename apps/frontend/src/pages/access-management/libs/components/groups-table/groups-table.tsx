import { Modal, Table } from "~/libs/components/components.js";
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
import { GroupsUpdateForm } from "../groups-update-form/groups-update-form.js";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
};

const GroupsTable = ({ groups }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { isOpened, onClose, onOpen } = useModal();
	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups, {
		onEdit: (group: GroupGetAllItemResponseDto) => {
			setGroupToEdit(group);
			onOpen();
		},
	});

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

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />

			{groupToEdit && (
				<Modal
					isOpened={isOpened}
					onClose={handleModalClose}
					title="Update group"
				>
					<GroupsUpdateForm group={groupToEdit} onSubmit={handleUpdate} />
				</Modal>
			)}
		</>
	);
};

export { GroupsTable };
