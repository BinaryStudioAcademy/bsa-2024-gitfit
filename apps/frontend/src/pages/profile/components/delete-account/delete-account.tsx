import { Button, ConfirmationModal } from "~/libs/components/components.js";
import { useCallback, useModal } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserAuthResponseDto;
};

const DeleteAccount = ({ user }: Properties): JSX.Element => {
	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleDeleteClick = useCallback((): void => {
		onModalOpen();
	}, [onModalOpen]);

	const handleDeleteConfirm = useCallback(() => {
		onModalClose();
	}, [onModalClose]);

	return (
		<div className={styles["profile-delete"]}>
			<h2 className={styles["delete-title"]}>Delete account {user.name}</h2>
			<p className={styles["delete-text"]}>This action cannot be undone.</p>
			<Button
				label="Delete Your Account"
				onClick={handleDeleteClick}
				variant="danger"
			/>
			<ConfirmationModal
				confirmationText="The account will be marked as deleted. The account won`t be accessible, but it can be restored if needed. Do you want to continue?"
				confirmLabel="Yes, Delete it"
				isModalOpened={isModalOpened}
				onConfirm={handleDeleteConfirm}
				onModalClose={onModalClose}
				title="Are you sure?"
			/>
		</div>
	);
};

export { DeleteAccount };
