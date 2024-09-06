import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import styles from "./styles.module.css";

type Properties = {
	group: GroupGetAllItemResponseDto;
	onDelete: (group: GroupGetAllItemResponseDto) => void;
};

const GroupMenu = ({ group, onDelete }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleDeleteClick = useCallback(() => {
		onDelete(group);
	}, [onDelete, group]);

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
