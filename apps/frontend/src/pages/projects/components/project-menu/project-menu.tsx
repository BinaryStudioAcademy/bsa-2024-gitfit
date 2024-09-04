import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEditClick: () => void;
};

const ProjectMenu = ({ onEditClick }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEditClick = useCallback(() => {
		onEditClick();
		onClose();
	}, [onEditClick, onClose]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
		</Menu>
	);
};

export { ProjectMenu };
