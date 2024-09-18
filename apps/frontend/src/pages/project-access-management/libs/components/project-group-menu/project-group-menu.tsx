import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onDelete: (projectGroupId: number) => void;
	onMenuClose: () => void;
	onMenuOpen: () => void;
	projectGroupId: number;
};

const ProjectGroupMenu = ({
	onDelete,
	onMenuClose,
	onMenuOpen,
	projectGroupId,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

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
