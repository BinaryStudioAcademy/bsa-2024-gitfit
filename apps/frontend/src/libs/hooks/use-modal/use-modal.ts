import { useCallback, useState } from "react";

type UseModalReturn = {
	closeModal: () => void;
	isOpened: boolean;
	showModal: () => void;
};

const useModal = (): UseModalReturn => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const showModal = useCallback((): void => {
		setIsOpened(true);
	}, []);

	const closeModal = useCallback((): void => {
		setIsOpened(false);
	}, []);

	return { closeModal, isOpened, showModal };
};

export { useModal };
