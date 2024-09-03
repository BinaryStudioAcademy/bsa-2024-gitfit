import { useCallback, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	isPopoverOpened: boolean;
	onPopoverClose: () => void;
	onPopoverOpen: () => void;
};

const usePopover = (): Properties => {
	const [isPopoverOpened, setIsPopoverOpened] = useState<boolean>(false);

	const handlePopoverOpen = useCallback(() => {
		setIsPopoverOpened(true);
	}, []);

	const handlePopoverClose = useCallback(() => {
		setIsPopoverOpened(false);
	}, []);

	return {
		isPopoverOpened,
		onPopoverClose: handlePopoverClose,
		onPopoverOpen: handlePopoverOpen,
	};
};

export { usePopover };
