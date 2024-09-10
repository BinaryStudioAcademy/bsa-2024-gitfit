import { Button, Modal } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	content: string;
	isOpened: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

const ConfirmationModal = ({
	content,
	isOpened,
	onClose,
	onConfirm,
}: Properties): JSX.Element => {
	const handleConfirmClick = useCallback(() => {
		onConfirm();
		onClose();
	}, [onConfirm, onClose]);

	return (
		<Modal isOpened={isOpened} onClose={onClose} title="Are you sure?">
			<p className={styles["confirmation-text"]}>{content}</p>
			<div className={styles["confirmation-buttons"]}>
				<div className={styles["button-wrapper"]}>
					<Button label="Cancel" onClick={onClose} variant="outlined" />
				</div>
				<div className={styles["button-wrapper"]}>
					<Button
						label="Confirm"
						onClick={handleConfirmClick}
						variant="danger"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
