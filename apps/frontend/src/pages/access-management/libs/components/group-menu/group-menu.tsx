import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onDelete: () => void;
};

const GroupMenu = ({ onDelete }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete();
		onClose();
	}, [onDelete, onClose]);

	return (
		<div className={styles["options-container"]}>
			<div className={styles["options-wrapper"]}>
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					<MenuItem
						iconName="trashBin"
						label="Delete"
						onClick={handleDeleteClick}
						variant="danger"
					/>
				</Menu>
			</div>
		</div>
	);
};

export { GroupMenu };
