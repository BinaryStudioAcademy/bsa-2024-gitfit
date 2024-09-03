import { MenuItem, Modal, Popover } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePopover,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectGetAllItemResponseDto,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";

import { ProjectUpdateForm } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	project: ProjectGetAllItemResponseDto;
};

const ProjectPopover = ({ children, project }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { projectPatchStatus } = useAppSelector(({ projects }) => projects);

	const { isPopoverOpened, onPopoverClose, onPopoverOpen } = usePopover();
	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const handleEditClick = useCallback((): void => {
		onPopoverClose();
		onModalOpen();
	}, [onPopoverClose, onModalOpen]);

	useEffect(() => {
		if (projectPatchStatus === DataStatus.FULFILLED) {
			onModalClose();
		}
	}, [projectPatchStatus, onModalClose]);

	const handleProjectEditSubmit = useCallback(
		(id: number, payload: ProjectPatchRequestDto) => {
			void dispatch(projectActions.patch({ id, payload }));
		},
		[dispatch],
	);

	return (
		<>
			<Popover
				content={
					<div className={styles["project-menu-popover"]}>
						<div className={styles["project-menu-items"]}>
							<MenuItem
								iconName="pencil"
								label="Edit"
								onClick={handleEditClick}
							/>
						</div>
					</div>
				}
				isPopoverOpened={isPopoverOpened}
				onPopoverClose={onPopoverClose}
				onPopoverOpen={onPopoverOpen}
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
