import { useState } from "react";

type Properties = {
	isModalOpened: boolean;
	onModalClose: () => void;
	onModalOpen: () => void;
};

const useModal = (): Properties => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const handleModalOpen = (): void => {
		setIsModalOpened(true);
	};

	const handleModalClose = (): void => {
		setIsModalOpened(false);
	};

	return {
		isModalOpened,
		onModalClose: handleModalClose,
		onModalOpen: handleModalOpen,
	};
};

export { useModal };
