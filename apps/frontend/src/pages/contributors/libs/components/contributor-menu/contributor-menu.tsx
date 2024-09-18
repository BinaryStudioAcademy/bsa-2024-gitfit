import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	contributorId: number;
	onMerge: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	onMerge,
}: Properties): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

	const handleMerge = useCallback(() => {
		onMerge(contributorId);
		onClose();
	}, [onMerge, contributorId, onClose]);

	return (
		<div className={styles["menu-container"]}>
			<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
				<MenuItem iconName="merge" label="Merge" onClick={handleMerge} />
			</Menu>
		</div>
	);
};

export { ContributorMenu };
