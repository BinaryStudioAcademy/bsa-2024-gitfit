import { Menu, MenuItem } from "~/libs/components/components.js";
import { PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";

type Properties = {
	onDelete: () => void;
	onEdit: () => void;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const ProjectMenu = ({
	onDelete,
	onEdit,
	userPermissions,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const handleDeleteClick = useCallback(() => {
		onDelete();
		onClose();
	}, [onDelete, onClose]);

	const hasEditOrDeleteProjectPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const isMenuShown = hasEditOrDeleteProjectPermission;

	return (
		<>
			{isMenuShown && (
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
