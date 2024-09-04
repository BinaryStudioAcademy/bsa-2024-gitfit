import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	groupId: number;
	onDelete: (groupId: number) => void;
};

const GroupMenu = ({ groupId, onDelete }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(groupId);
		onClose();
	}, [onDelete, onClose, groupId]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem
				iconName="trashBin"
				label="Delete"
				onClick={handleDeleteClick}
			/>
		</Menu>
	);
};

export { GroupMenu };
