import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";

import styles from "./styles.module.css";

type Properties = {
	onDelete: () => void;
	onEdit: () => void;
	projectId: number;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const ProjectDetailsMenu = ({
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

	const hasManageProjectAccessPermission = checkHasPermission(
		[PermissionKey.MANAGE_USER_ACCESS, PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const hasManageProjectPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);
	const isMenuShown =
		hasManageProjectAccessPermission || hasManageProjectPermission;

	return (
		<>
			{isMenuShown && (
				<Menu
					buttonClassName={styles["trigger-button"] as string}
					isOpened={isOpened}
					onClose={onClose}
					onOpen={onOpen}
				>
					{hasManageProjectPermission && (
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

					{hasManageProjectPermission && (
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
