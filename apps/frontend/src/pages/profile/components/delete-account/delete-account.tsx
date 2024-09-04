import { Button, ConfirmationModal } from "~/libs/components/components.js";
import { useAppDispatch, useCallback, useModal } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as userActions } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	userId: number;
};

const DeleteAccount = ({ userId }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleDeleteClick = useCallback((): void => {
		onModalOpen();
	}, [onModalOpen]);

	const handleDeleteConfirm = useCallback(() => {
		void dispatch(userActions.deleteById(userId));
		void dispatch(authActions.logout());
	}, [dispatch, userId]);

	return (
		<div className={styles["profile-delete"]}>
			<h2 className={styles["delete-title"]}>Delete account</h2>
			<p className={styles["delete-text"]}>This action cannot be undone.</p>
			<Button
				label="Delete Your Account"
				onClick={handleDeleteClick}
				variant="danger"
			/>
			<ConfirmationModal
				confirmationText="This account will be deleted. This action cannot be undone. Do you want to continue?"
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
