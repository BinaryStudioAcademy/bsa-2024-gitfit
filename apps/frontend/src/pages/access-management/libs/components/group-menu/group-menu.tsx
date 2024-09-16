import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	groupId: number;
	onDelete: (groupId: number) => void;
	onEdit: (groupId: number) => void;
	onMenuClose: () => void;
	onMenuOpen: () => void;
};

const GroupMenu = ({
	groupId,
	onDelete,
	onEdit,
	onMenuClose,
	onMenuOpen,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(groupId);
		onClose();
	}, [groupId, onDelete, onClose]);

	const handleEdit = useCallback(() => {
		onEdit(groupId);
		onClose();
	}, [groupId, onEdit, onClose]);

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
				<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
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

export { GroupMenu };
