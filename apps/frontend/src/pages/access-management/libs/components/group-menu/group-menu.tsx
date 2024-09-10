import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	groupId: number;
	onDelete: (groupId: number) => void;
};

const GroupMenu = ({ groupId, onDelete }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(groupId);
	}, [onDelete, groupId]);

	return (
		<div className={styles["menu-container"]}>
			<Menu
				hasFixedPositioning
				isOpened={isOpened}
				onClose={onClose}
				onOpen={onOpen}
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
