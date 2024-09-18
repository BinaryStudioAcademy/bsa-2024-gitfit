import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, configureString } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEdit: () => void;
	projectId: number;
};

const ProjectDetailsMenu = ({ onEdit, projectId }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();
	const { userPermissions } = useAppSelector(({ auth }) => auth);

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	const projectAccessManagementRoute = configureString(
		AppRoute.PROJECT_ACCESS_MANAGEMENT,
		{
			id: projectId.toString(),
		},
	);

	const hasManageUserAccessPermission = checkHasPermission(
		[PermissionKey.MANAGE_USER_ACCESS],
		userPermissions,
	);
	const hasManageAllProjectsPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const isMenuAvailable =
		hasManageUserAccessPermission || hasManageAllProjectsPermission;

	return (
		<>
			{isMenuAvailable && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					{hasManageAllProjectsPermission && (
						<MenuItem
							iconName="pencil"
							label="Edit"
							onClick={handleEditClick}
						/>
					)}

					{hasManageUserAccessPermission && (
						<MenuItem
							href={projectAccessManagementRoute}
							iconName="access"
							label="Manage Access"
						/>
					)}
				</Menu>
			)}
		</>
	);
};

export { ProjectDetailsMenu };
