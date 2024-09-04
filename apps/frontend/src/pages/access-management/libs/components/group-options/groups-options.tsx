import { Menu, MenuItem } from "~/libs/components/components.js";
import { usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onEdit: () => void;
};

const GroupOptions = ({ onEdit }: Properties): React.ReactElement => {
	const { isOpened, onClose, onOpen } = usePopover();

	return (
		<div className={styles["options-cell"]}>
			<div className={styles["options-wrapper"]}>
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					<MenuItem iconName="pencil" label="Edit" onClick={onEdit} />
				</Menu>
			</div>
		</div>
	);
};

export { GroupOptions };
