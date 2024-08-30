import { Button, Modal } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type ConfirmationModalProperties = {
	cancelLabel?: string;
	confirmationText: string;
	confirmLabel?: string;
	isModalOpened: boolean;
	onConfirm: () => void;
	onModalClose: () => void;
	title: string;
};

const ConfirmationModal = ({
	cancelLabel = "Cancel",
	confirmationText,
	confirmLabel = "Confirm",
	isModalOpened,
	onConfirm,
	onModalClose,
	title,
}: ConfirmationModalProperties): JSX.Element => {
	const handleConfirmClick = useCallback(() => {
		onConfirm();
		onModalClose();
	}, [onConfirm, onModalClose]);

	return (
		<Modal
			isModalOpened={isModalOpened}
			onModalClose={onModalClose}
			title={title}
		>
			<p className={styles["confirmation-text"]}>{confirmationText}</p>
			<div className={styles["confirmation-buttons"]}>
				<Button label={cancelLabel} onClick={onModalClose} variant="outlined" />
				<Button
					label={confirmLabel}
					onClick={handleConfirmClick}
					variant="danger"
				/>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
