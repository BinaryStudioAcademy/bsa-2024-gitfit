import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onDelete: (projectGroupId: number) => void;
	onEdit: (projectGroupId: number) => void;
	onMenuClose: () => void;
	onMenuOpen: () => void;
	projectGroupId: number;
};

const ProjectGroupMenu = ({
	onDelete,
	onEdit,
	onMenuClose,
	onMenuOpen,
	projectGroupId,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEditClick = useCallback(() => {
		onEdit(projectGroupId);
		onClose();
	}, [projectGroupId, onEdit, onClose]);

	const handleDeleteClick = useCallback(() => {
		onDelete(projectGroupId);
		onClose();
	}, [projectGroupId, onDelete, onClose]);

	const handleOpen = useCallback(() => {
		onOpen();
		onMenuOpen();
	}, [onOpen, onMenuOpen]);

	const handleClose = useCallback(() => {
		onClose();
		onMenuClose();
	}, [onClose, onMenuClose]);

	return (
		<div className={styles["menu-container"]}>
			<Menu isOpened={isOpened} onClose={handleClose} onOpen={handleOpen}>
				<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
				<MenuItem
					iconName="trashBin"
					label="Delete"
					onClick={handleDeleteClick}
					variant="danger"
				/>
			</Menu>
		</div>
	);
};

export { ProjectGroupMenu };
