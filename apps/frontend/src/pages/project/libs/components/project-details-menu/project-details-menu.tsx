import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";

type Properties = {
	onEdit: () => void;
	projectId: number;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const ProjectDetailsMenu = ({
	onEdit,
	projectId,
	userPermissions,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

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

	const hasManageProjectAccessPermission = checkHasPermission(
		[PermissionKey.MANAGE_USER_ACCESS, PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const hasEditProjectPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const isMenuShown =
		hasManageProjectAccessPermission || hasEditProjectPermission;

	return (
		<>
			{isMenuShown && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					{hasEditProjectPermission && (
						<MenuItem
							iconName="pencil"
							label="Edit"
							onClick={handleEditClick}
						/>
					)}

					{hasManageProjectAccessPermission && (
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
