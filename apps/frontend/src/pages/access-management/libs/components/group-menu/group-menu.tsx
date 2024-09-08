import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import { type GroupActions } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groupId: number;
} & GroupActions;

const GroupMenu = ({ groupId, onDelete }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(groupId);
	}, [onDelete, groupId]);

	return (
		<div className={styles["options-container"]}>
			<Menu
				isOpened={isOpened}
				onClose={onClose}
				onOpen={onOpen}
				usePositioning
			>
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
