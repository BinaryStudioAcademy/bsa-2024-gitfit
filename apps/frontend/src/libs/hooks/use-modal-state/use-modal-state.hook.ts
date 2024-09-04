import { useCallback, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	isOpened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const useModal = (): Properties => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setIsOpened(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setIsOpened(false);
	}, []);

	return {
		isOpened,
		onClose: handleModalClose,
		onOpen: handleModalOpen,
	};
};

export { useModal };
