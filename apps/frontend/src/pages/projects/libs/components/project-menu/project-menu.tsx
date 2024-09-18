import { PermissionKey } from "@git-fit/shared";

import {
	Menu,
	MenuItem,
	ProtectedComponent,
} from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onDelete: () => void;
	onEdit: () => void;
};

const ProjectMenu = ({ onDelete, onEdit }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const handleDeleteClick = useCallback(() => {
		onDelete();
		onClose();
	}, [onDelete, onClose]);

	return (
		<ProtectedComponent
			requiredPermissions={[PermissionKey.MANAGE_ALL_PROJECTS]}
		>
			<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
				<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
				<MenuItem
					iconName="trashBin"
					label="Delete"
					onClick={handleDeleteClick}
					variant="danger"
				/>
			</Menu>
		</ProtectedComponent>
	);
};

export { ProjectMenu };
