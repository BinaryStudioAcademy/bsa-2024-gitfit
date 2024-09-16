import { useCallback, useState } from "~/libs/hooks/hooks.js";

type UsePopover = {
	isOpened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const usePopover = (): UsePopover => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const handlePopoverOpen = useCallback(() => {
		setIsOpened(true);
	}, []);

	const handlePopoverClose = useCallback(() => {
		setIsOpened(false);
	}, []);

	return {
		isOpened,
		onClose: handlePopoverClose,
		onOpen: handlePopoverOpen,
	};
};

export { usePopover };
