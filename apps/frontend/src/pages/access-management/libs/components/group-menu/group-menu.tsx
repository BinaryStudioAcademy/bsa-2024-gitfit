import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import { type GroupActions } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groupId: number;
} & GroupActions;

const GroupMenu = ({ groupId, onDelete, onEdit }: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(groupId);
		onClose();
	}, [groupId, onDelete, onClose]);

	const handleEdit = useCallback(() => {
		onEdit(groupId);
		onClose();
	}, [groupId, onEdit, onClose]);

	return (
		<div className={styles["menu-container"]}>
			<Menu
				hasFixedPositioning
				isOpened={isOpened}
				onClose={onClose}
				onOpen={onOpen}
			>
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
