import { Icon, Modal, Popover } from "~/libs/components/components.js";
// import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
// import { actions as authActions } from "~/modules/auth/auth.js";
import { useCallback, useModal } from "~/libs/hooks/hooks.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { ProjectUpdateForm } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	project: ProjectGetAllItemResponseDto;
};

const ProjectPopover = ({ children, project }: Properties): JSX.Element => {
	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleEditClick = useCallback((): void => {
		onModalOpen();
	}, [onModalOpen]);

	return (
		<>
			<Popover
				content={
					<div className={styles["project-menu-popover"]}>
						<div className={styles["project-menu-items"]}>
							<button
								className={styles["project-menu-item"]}
								onClick={handleEditClick}
							>
								<Icon height={20} name="edit" width={20} />
								<span className={styles["project-menu-item-text"]}>Edit</span>
							</button>
						</div>
					</div>
				}
			>
				{children}
			</Popover>
			<Modal
				isModalOpened={isModalOpened}
				onModalClose={onModalClose}
				title="Update project"
			>
				<ProjectUpdateForm project={project} />
			</Modal>
		</>
	);
};

export { ProjectPopover };
