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
	useNavigate,
	useParams,
} from "~/libs/hooks/hooks.js";
import {
	actions as projectActions,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { ProjectUpdateForm } from "~/pages/projects/libs/components/components.js";

import {
	ProjectMenu,
	SetupAnalyticsModal,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id: projectId } = useParams<{ id: string }>();

	const { project, projectPatchStatus, projectStatus } = useAppSelector(
		({ projects }) => projects,
	);

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

	// Fetch project by ID
	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
		}
	}, [dispatch, projectId]);

	// Refetch project after successful patch
	useEffect(() => {
		if (projectPatchStatus === DataStatus.FULFILLED && projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
		}
	}, [dispatch, projectPatchStatus, projectId]);

	// Handle project edit
	const handleEditProject = useCallback(() => {
		handleEditModalOpen();
	}, [handleEditModalOpen]);

	// Handle manage access redirection
	const handleManageAccess = useCallback(() => {
		navigate(AppRoute.ACCESS_MANAGEMENT);
	}, [navigate]);

	// Submit edited project
	const handleProjectEditSubmit = useCallback(
		(payload: ProjectPatchRequestDto) => {
			if (project) {
				void dispatch(projectActions.patch({ id: project.id, payload }));
			}
		},
		[dispatch, project],
	);

	// Handle loading and error states
	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;
	const isRejected = projectStatus === DataStatus.REJECTED;

	if (isRejected) {
		return <NotFound />;
	}

	return (
		<PageLayout isLoading={isLoading}>
			{project && (
				<>
					<div className={styles["breadcrumb-container"]}>
						<Breadcrumbs
							items={[
								{ href: AppRoute.ROOT, label: "Projects" },
								{ label: project.name },
							]}
						/>
					</div>

					<div className={styles["project-layout"]}>
						<div className={styles["header-container"]}>
							<h1 className={styles["title"]}>{project.name}</h1>

							<ProjectMenu
								onEdit={handleEditProject}
								onManageAccess={handleManageAccess}
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

						<Button
							label="Setup analytics"
							onClick={onSetupAnalyticsModalOpen}
						/>
					</div>

					{/* Edit Project Modal */}
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

					{/* Setup Analytics Modal */}
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
