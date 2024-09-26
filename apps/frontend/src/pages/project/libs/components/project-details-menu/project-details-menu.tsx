import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	hasEditPermission: boolean;
	hasManageAllProjectsPermission: boolean;
	hasManagePermission: boolean;
	onDelete: () => void;
	onEdit: () => void;
	projectId: number;
};

const ProjectDetailsMenu = ({
	hasEditPermission,
	hasManageAllProjectsPermission,
	hasManagePermission,
	onDelete,
	onEdit,
	projectId,
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

	const isMenuShown =
		hasManagePermission || hasEditPermission || hasManageAllProjectsPermission;

	return (
		<>
			{isMenuShown && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					{(hasEditPermission ||
						hasManagePermission ||
						hasManageAllProjectsPermission) && (
						<MenuItem
							iconName="pencil"
							label="Edit"
							onClick={handleEditClick}
						/>
					)}
					{(hasManagePermission || hasManageAllProjectsPermission) && (
						<>
							<MenuItem
								href={projectAccessManagementRoute}
								iconName="access"
								label="Manage Access"
							/>
							<MenuItem
								iconName="trashBin"
								label="Delete"
								onClick={handleDeleteClick}
								variant="danger"
							/>
						</>
					)}
				</Menu>
			)}
		</>
	);
};

export { ProjectDetailsMenu };
