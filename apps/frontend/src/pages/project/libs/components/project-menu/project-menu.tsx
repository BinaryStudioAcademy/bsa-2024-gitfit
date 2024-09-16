import { Menu, MenuItem, NavLink } from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEdit: () => void;
};

const ProjectMenu = ({ onEdit }: Properties): JSX.Element | null => {
	const { isOpened, onClose, onOpen } = usePopover();
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

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
			<NavLink to={AppRoute.ACCESS_MANAGEMENT}>
				<MenuItem iconName="access" label="Manage Access" />
			</NavLink>
		</Menu>
	);
};

export { ProjectMenu };
