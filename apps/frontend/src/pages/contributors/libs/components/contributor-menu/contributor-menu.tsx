import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	contributorId: number;
	onEdit: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	onEdit,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEdit = useCallback(() => {
		onEdit(contributorId);
		onClose();
	}, [contributorId, onEdit, onClose]);

	return (
		<div className={styles["menu-container"]}>
			<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
				<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
			</Menu>
		</div>
	);
};

export { ContributorMenu };
