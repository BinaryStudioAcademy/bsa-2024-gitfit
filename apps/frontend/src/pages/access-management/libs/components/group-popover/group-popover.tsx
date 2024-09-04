import {
	ConfirmationModal,
	Icon,
	Popover,
} from "~/libs/components/components.js";
import { useAppDispatch, useCallback, useModal } from "~/libs/hooks/hooks.js";
import { actions as groupActions } from "~/modules/groups/groups.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	groupId: number;
};

const GroupPopover = ({ children, groupId }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleDeleteClick = useCallback((): void => {
		onModalOpen();
	}, [onModalOpen]);

	const handleDeleteConfirm = useCallback(() => {
		void dispatch(groupActions.deleteById(groupId));
		onModalClose();
	}, [dispatch, groupId, onModalClose]);

	return (
		<>
			<Popover
				content={
					<div className={styles["group-menu-popover"]}>
						<div className={styles["group-menu-items"]}>
							<div className={styles["popover"]}>
								<button className={styles["button"]}>
									<Icon height={15} name="pencil" width={15} />
									Edit
								</button>
								<button
									className={styles["button"]}
									onClick={handleDeleteClick}
								>
									<Icon height={17} name="trashBin" width={17} />
									Delete
								</button>
							</div>
						</div>
					</div>
				}
			>
				{children}
			</Popover>
			<ConfirmationModal
				cancelLabel="Cancel"
				confirmationText="This group will be deleted. This action cannot be undone. Do you want to continue?"
				confirmLabel="Yes, Delete it"
				isModalOpened={isModalOpened}
				onConfirm={handleDeleteConfirm}
				onModalClose={onModalClose}
				title="Are you sure?"
			/>
		</>
	);
};

export { GroupPopover };
