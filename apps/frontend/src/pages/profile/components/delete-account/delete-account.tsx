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

	const { isOpened, onClose, onOpen } = useModal();

	const handleDeleteClick = useCallback((): void => {
		onOpen();
	}, [onOpen]);

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
				content="This account will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
				isOpened={isOpened}
				onClose={onClose}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export { DeleteAccount };
