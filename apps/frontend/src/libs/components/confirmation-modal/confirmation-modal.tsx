import { Button, Modal } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	cancelLabel?: string;
	confirmationText: string;
	confirmLabel?: string;
	isOpened: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const ConfirmationModal = ({
	cancelLabel = "Cancel",
	confirmationText,
	confirmLabel = "Confirm",
	isOpened,
	onClose,
	onConfirm,
	title,
}: Properties): JSX.Element => {
	const handleConfirmClick = useCallback(() => {
		onConfirm();
		onClose();
	}, [onConfirm, onClose]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title={title}>
			<p className={styles["confirmation-text"]}>{confirmationText}</p>
			<div className={styles["confirmation-buttons"]}>
				<div className={styles["button-wrapper"]}>
					<Button label={cancelLabel} onClick={onClose} variant="outlined" />
				</div>
				<div className={styles["button-wrapper"]}>
					<Button
						label={confirmLabel}
						onClick={handleConfirmClick}
						variant="danger"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
