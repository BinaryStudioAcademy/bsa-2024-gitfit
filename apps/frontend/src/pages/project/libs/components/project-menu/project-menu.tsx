import { Menu, MenuItem } from "~/libs/components/components.js";
import { PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEdit: () => void;
	onManageAccess: () => void;
};

const ProjectMenu = ({
	onEdit,
	onManageAccess,
}: Properties): JSX.Element | null => {
	const { isOpened, onClose, onOpen } = usePopover();

	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const handleManageAccessClick = useCallback(() => {
		onManageAccess();
		onClose();
	}, [onManageAccess, onClose]);

	if (!authenticatedUser) {
		return null;
	}

	const hasManageAllProjectsPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		authenticatedUser.groups.flatMap((group) => group.permissions),
	);

	if (!hasManageAllProjectsPermission) {
		return null;
	}

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
