import { useCallback, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	isModalOpened: boolean;
	onModalClose: () => void;
	onModalOpen: () => void;
};

const useModal = (): Properties => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setIsModalOpened(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setIsModalOpened(false);
	}, []);

	return {
		isModalOpened,
		onModalClose: handleModalClose,
		onModalOpen: handleModalOpen,
	};
};

export { useModal };
