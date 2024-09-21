import { Menu, MenuItem } from "~/libs/components/components.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	contributorId: number;
	hasEditPermission: boolean;
	onEdit: (contributorId: number) => void;
	onMerge: (contributorId: number) => void;
};

const ContributorMenu = ({
	contributorId,
	hasEditPermission,
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

	const isMenuShown = hasEditPermission;

	return (
		<>
			{isMenuShown && (
				<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
					<MenuItem iconName="pencil" label="Edit" onClick={handleEdit} />
					<MenuItem iconName="merge" label="Merge" onClick={handleMerge} />
				</Menu>
			)}
		</>
	);
};

export { ContributorMenu };
