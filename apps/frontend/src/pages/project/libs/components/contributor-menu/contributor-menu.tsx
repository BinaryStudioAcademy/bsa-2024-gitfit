import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	contributorId: number;
	hasEditPermission: boolean;
	hasMergePermission: boolean;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	hasEditPermission,
	hasMergePermission,
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
	}, [onMerge, contributorId, onClose]);

	const isMenuShown = hasEditPermission || hasMergePermission;

	return (
		<>
			{isMenuShown && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					{hasEditPermission && (
						<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
					)}
					{hasMergePermission && (
						<MenuItem iconName="merge" label="Merge" onClick={handleMerge} />
					)}
				</Menu>
			)}
		</>
	);
};

export { ContributorMenu };
