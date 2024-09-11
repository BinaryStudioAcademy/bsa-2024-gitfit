import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEdit: () => void;
	onManageAccess: () => void;
};

const ProjectMenu = ({ onEdit, onManageAccess }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const handleManageAccessClick = useCallback(() => {
		onManageAccess();
		onClose();
	}, [onManageAccess, onClose]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
			<MenuItem
				iconName="access"
				label="Manage Access"
				onClick={handleManageAccessClick}
			/>
		</Menu>
	);
};

export { ProjectMenu };
