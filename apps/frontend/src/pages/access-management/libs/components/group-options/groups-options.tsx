import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import styles from "./styles.module.css";

type Properties = {
	group: GroupGetAllItemResponseDto;
	onEdit: (group: GroupGetAllItemResponseDto) => void;
};

const GroupOptions = ({ group, onEdit }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEdit = useCallback(() => {
		onEdit(group);
	}, [group, onEdit]);

	return (
		<div className={styles["options-cell"]}>
			<div className={styles["options-wrapper"]}>
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
				</Menu>
			</div>
		</div>
	);
};

export { GroupOptions };
