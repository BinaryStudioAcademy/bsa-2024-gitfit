import { Icon, Modal, Popover } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectGetAllItemResponseDto,
	type ProjectUpdateRequestDto,
} from "~/modules/projects/projects.js";

import { ProjectUpdateForm } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	project: ProjectGetAllItemResponseDto;
};

const ProjectPopover = ({ children, project }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { projectUpdateStatus } = useAppSelector(({ projects }) => projects);

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleEditClick = useCallback(
		(event: React.MouseEvent): void => {
			event.stopPropagation();
			onModalOpen();
		},
		[onModalOpen],
	);

	useEffect(() => {
		if (projectUpdateStatus === DataStatus.FULFILLED) {
			onModalClose();
		}
	}, [projectUpdateStatus, onModalClose]);

	const handleProjectEditSubmit = useCallback(
		(id: number, payload: ProjectUpdateRequestDto) => {
			void dispatch(projectActions.update({ id, payload }));
		},
		[dispatch],
	);

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
				<ProjectUpdateForm
					onSubmit={handleProjectEditSubmit}
					project={project}
				/>
			</Modal>
		</>
	);
};

export { ProjectPopover };
