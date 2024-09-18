import { PermissionKey } from "@git-fit/shared";

import { Menu, MenuItem } from "~/libs/components/components.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onDelete: () => void;
	onEdit: () => void;
};

const ProjectMenu = ({ onDelete, onEdit }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();
	const { userPermissions } = useAppSelector(({ auth }) => auth);

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const handleDeleteClick = useCallback(() => {
		onDelete();
		onClose();
	}, [onDelete, onClose]);

	const hasManageAllProjectsPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const isMenuAvailable = hasManageAllProjectsPermission;

	return (
		<>
			{isMenuAvailable && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
					<MenuItem
						iconName="trashBin"
						label="Delete"
						onClick={handleDeleteClick}
						variant="danger"
					/>
				</Menu>
			)}
		</>
	);
};

export { ProjectMenu };
