import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";

type Properties = {
	hasEditPermission: boolean;
	hasManagePermission: boolean;
	onDelete: () => void;
	onEdit: () => void;
	projectId: number;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const ProjectDetailsMenu = ({
	hasEditPermission,
	hasManagePermission,
	onDelete,
	onEdit,
	projectId,
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

	const projectAccessManagementRoute = configureString(
		AppRoute.PROJECT_ACCESS_MANAGEMENT,
		{
			id: projectId.toString(),
		},
	);

	const hasManageProjectAccessPermission =
		checkHasPermission(
			[PermissionKey.MANAGE_USER_ACCESS, PermissionKey.MANAGE_ALL_PROJECTS],
			userPermissions,
		) || hasManagePermission;

	const hasEditProjectPermission =
		checkHasPermission([PermissionKey.MANAGE_ALL_PROJECTS], userPermissions) ||
		hasEditPermission ||
		hasManagePermission;

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

					{hasManageProjectAccessPermission && (
						<MenuItem
							iconName="trashBin"
							label="Delete"
							onClick={handleDeleteClick}
							variant="danger"
						/>
					)}
				</Menu>
			)}
		</>
	);
};

export { ProjectDetailsMenu };
