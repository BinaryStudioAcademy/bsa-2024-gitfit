import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import { type GroupActions } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	groupId: number;
} & GroupActions;

const GroupOptions = ({ groupId, onEdit }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEdit = useCallback(() => {
		onEdit(groupId);
	}, [groupId, onEdit]);

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
