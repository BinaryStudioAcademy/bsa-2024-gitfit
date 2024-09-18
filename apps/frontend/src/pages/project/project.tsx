import {
	Breadcrumbs,
	Button,
	Modal,
	PageLayout,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { ProjectUpdateForm } from "~/pages/projects/libs/components/components.js";

import {
	ContributorsList,
	ProjectDetailsMenu,
	SetupAnalyticsModal,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<{ id: string }>();

	const {
		project,
		projectContributors,
		projectContributorsStatus,
		projectPatchStatus,
		projectStatus,
	} = useAppSelector(({ projects }) => projects);
	const {
		isOpened: isSetupAnalyticsModalOpened,
		onClose: onSetupAnalyticsModalClose,
		onOpen: onSetupAnalyticsModalOpen,
	} = useModal();

	const {
		isOpened: isEditModalOpen,
		onClose: handleEditModalClose,
		onOpen: handleEditModalOpen,
	} = useModal();

	const {
		isOpened: isMergeModalOpen,
		onClose: onMergeModalClose,
		onOpen: onMergeModalOpen,
	} = useModal();

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
			void dispatch(projectActions.loadAllContributorsByProjectId(projectId));
		}
	}, [dispatch, projectId]);

	useEffect(() => {
		if (projectPatchStatus === DataStatus.FULFILLED) {
			handleEditModalClose();

			if (projectId) {
				void dispatch(projectActions.getById({ id: projectId }));
			}
		}
	}, [projectPatchStatus, handleEditModalClose, dispatch, projectId]);

	const handleEditProject = useCallback(() => {
		handleEditModalOpen();
	}, [handleEditModalOpen]);

	const handleProjectEditSubmit = useCallback(
		(payload: ProjectPatchRequestDto) => {
			if (project) {
				void dispatch(projectActions.patch({ id: project.id, payload }));
			}
		},
		[dispatch, project],
	);

	const handleMergeContributors = useCallback(() => {
		onMergeModalOpen();
	}, [onMergeModalOpen]);

	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;

	const isContributorsDataLoading =
		projectContributorsStatus === DataStatus.PENDING ||
		projectContributorsStatus === DataStatus.IDLE;

	const isRejected = projectStatus === DataStatus.REJECTED;

	const hasProject = project !== null;

	if (isRejected) {
		return <NotFound />;
	}

	return (
		<PageLayout isLoading={isLoading}>
			{hasProject && (
				<>
					<div className={styles["breadcrumb-container"]}>
						<Breadcrumbs
							items={[
								{ href: AppRoute.PROJECTS, label: "Projects" },
								{ label: project.name },
							]}
						/>
					</div>

					<div className={styles["project-layout"]}>
						<div className={styles["project-header"]}>
							<h1 className={styles["title"]}>{project.name}</h1>

							<ProjectDetailsMenu
								onEdit={handleEditProject}
								projectId={project.id}
							/>
						</div>

						<div className={styles["project-description-layout"]}>
							<h3 className={styles["project-description-title"]}>
								Description
							</h3>
							<p className={styles["project-description"]}>
								{project.description}
							</p>
						</div>

						<div>
							<Button
								label="Setup Analytics"
								onClick={onSetupAnalyticsModalOpen}
							/>
						</div>

						<div className={styles["contributors-list-wrapper"]}>
							<ContributorsList
								contributors={projectContributors}
								isLoading={isContributorsDataLoading}
								onMerge={handleMergeContributors}
							/>
						</div>
					</div>

					<Modal
						isOpened={isEditModalOpen}
						onClose={handleEditModalClose}
						title="Update project"
					>
						<ProjectUpdateForm
							onSubmit={handleProjectEditSubmit}
							project={project}
						/>
					</Modal>
					<Modal
						isOpened={isMergeModalOpen}
						onClose={onMergeModalClose}
						title="Merge contributors"
					>
						<h1>Hi</h1>
					</Modal>

					<SetupAnalyticsModal
						isOpened={isSetupAnalyticsModalOpened}
						onClose={onSetupAnalyticsModalClose}
						project={project}
					/>
				</>
			)}
		</PageLayout>
	);
};

export { Project };
