import { useState } from "react";

type Properties = {
	handleCloseModal: () => void;
	handleShowModal: () => void;
	isOpened: boolean;
};

const useModal = (): Properties => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const handleShowModal = (): void => {
		setIsOpened(true);
	};

	const handleCloseModal = (): void => {
		setIsOpened(false);
	};

	return { handleCloseModal, handleShowModal, isOpened };
};

export { useModal };
