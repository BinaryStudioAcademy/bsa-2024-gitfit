import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	contributorId: number;
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	hasSplitPermission: boolean;
	isSplitEnabled?: boolean;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
	onSplit: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	hasEditPermission,
	hasMergePermission,
	hasSplitPermission,
	isSplitEnabled = false,
	onEdit,
	onMerge,
	onSplit,
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

	const handleSplit = useCallback(() => {
		onSplit(contributorId);
		onClose();
	}, [contributorId, onSplit, onClose]);

	const isMenuShown =
		hasEditPermission || hasMergePermission || hasSplitPermission;

	return (
		<>
			{isMenuShown && (
				<div className={styles["menu-container"]}>
					<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
						{hasEditPermission && (
							<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
						)}
						{hasMergePermission && (
							<MenuItem iconName="merge" label="Merge" onClick={handleMerge} />
						)}
						{hasSplitPermission && isSplitEnabled && (
							<MenuItem iconName="split" label="Split" onClick={handleSplit} />
						)}
					</Menu>
				</div>
			)}
		</>
	);
};

export { ContributorMenu };
