import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	contributorId: number;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	onEdit,
	onMerge,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleEdit = useCallback(() => {
		onEdit(contributorId);
		onClose();
	}, [contributorId, onEdit, onClose]);

	const handleMerge = useCallback(() => {
		onMerge(contributorId);
		onClose();
	}, [contributorId, onMerge, onClose]);

	return (
		<div className={styles["menu-container"]}>
			<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
				<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
				<MenuItem iconName="merge" label="Merge" onClick={handleMerge} />
			</Menu>
		</div>
	);
};

export { ContributorMenu };
