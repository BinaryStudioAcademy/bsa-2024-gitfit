import {
	Breadcrumbs,
	Button,
	ConfirmationModal,
	Modal,
	Navigate,
	PageLayout,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission, subtractDays } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	useParams,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as contributorActions,
	type ContributorGetAllItemResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
} from "~/modules/contributors/contributors.js";
import {
	actions as projectActions,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";
import { ANALYTICS_DATE_MAX_RANGE } from "~/pages/analytics/libs/constants/analytics-date-max-range.constant.js";
import {
	ContributorMergeForm,
	ContributorUpdateForm,
} from "~/pages/contributors/libs/components/components.js";
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

	const { userPermissions } = useAppSelector(({ auth }) => auth);

	const {
		project,
		projectContributors,
		projectContributorsActivity,
		projectContributorsStatus,
		projectDeleteStatus,
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
		isOpened: isDeleteModalOpen,
		onClose: handleDeleteModalClose,
		onOpen: handleDeleteModalOpen,
	} = useModal();

	const {
		isOpened: isContributorUpdateModalOpen,
		onClose: handleContributorUpdateModalClose,
		onOpen: handleContributorUpdateModalOpen,
	} = useModal();

	const {
		isOpened: isContributorMergeModalOpen,
		onClose: handleContributorMergeModalClose,
		onOpen: handleContributorMergeModalOpen,
	} = useModal();

	const [contributorToEdit, setContributorToEdit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToMerge, setContributorToMerge] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
			void dispatch(projectActions.loadAllContributorsByProjectId(projectId));

			const todayDate = new Date();
			const endDate = todayDate.toISOString();
			const startDate = subtractDays(
				todayDate,
				ANALYTICS_DATE_MAX_RANGE,
			).toISOString();
			void dispatch(
				projectActions.loadAllContributorsActivityByProjectId({
					endDate,
					projectId,
					startDate,
				}),
			);
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

	const handleDeleteProject = useCallback(() => {
		handleDeleteModalOpen();
	}, [handleDeleteModalOpen]);

	const handleProjectEditSubmit = useCallback(
		(payload: ProjectPatchRequestDto) => {
			if (project) {
				void dispatch(projectActions.patch({ id: project.id, payload }));
			}
		},
		[dispatch, project],
	);

	const handleProjectDeleteConfirm = useCallback(() => {
		if (project) {
			void dispatch(projectActions.deleteById(project.id));
		}
	}, [project, dispatch]);

	const handleEditContributor = useCallback(
		(contributorId: number) => {
			const contributor = projectContributors.find(
				(contributor) => contributor.id === contributorId,
			);

			if (contributor) {
				setContributorToEdit(contributor);
				handleContributorUpdateModalOpen();
			}
		},
		[handleContributorUpdateModalOpen, projectContributors],
	);

	const handleContributorUpdateSubmit = useCallback(
		(payload: ContributorPatchRequestDto) => {
			if (contributorToEdit && projectId) {
				void dispatch(
					contributorActions.patch({
						id: contributorToEdit.id,
						payload,
						projectId,
					}),
				);
				setContributorToEdit(null);
				handleContributorUpdateModalClose();
			}
		},
		[dispatch, contributorToEdit, handleContributorUpdateModalClose, projectId],
	);

	const handleMergeContributor = useCallback(
		(contributorId: number) => {
			const contributor = projectContributors.find(
				(contributor) => contributor.id === contributorId,
			);

			if (contributor) {
				setContributorToMerge(contributor);
				handleContributorMergeModalOpen();
			}
		},
		[handleContributorMergeModalOpen, projectContributors],
	);

	const handleContributorMergeSubmit = useCallback(
		(payload: ContributorMergeRequestDto) => {
			if (contributorToMerge) {
				void dispatch(
					contributorActions.merge({ id: contributorToMerge.id, payload }),
				);
				setContributorToMerge(null);
				handleContributorMergeModalClose();
			}
		},
		[contributorToMerge, dispatch, handleContributorMergeModalClose],
	);

	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;

	const isContributorsDataLoading =
		projectContributorsStatus === DataStatus.PENDING ||
		projectContributorsStatus === DataStatus.IDLE;

	const isRejected = projectStatus === DataStatus.REJECTED;

	const hasProject = project !== null;

	const hasManageAllProjectsPermission = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		userPermissions,
	);

	const hasSetupAnalyticsPermission = hasManageAllProjectsPermission;
	const hasEditContributorPermission = hasManageAllProjectsPermission;
	const hasMergeContributorPermission = hasManageAllProjectsPermission;

	if (isRejected) {
		return <NotFound />;
	}

	const isProjectDeleted =
		hasProject &&
		project.id === Number(projectId) &&
		projectDeleteStatus === DataStatus.FULFILLED;

	if (isProjectDeleted) {
		return <Navigate to={AppRoute.PROJECTS} />;
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
								onDelete={handleDeleteProject}
								onEdit={handleEditProject}
								projectId={project.id}
								userPermissions={userPermissions}
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

						{hasSetupAnalyticsPermission && (
							<div>
								<Button
									label="Setup Analytics"
									onClick={onSetupAnalyticsModalOpen}
								/>
							</div>
						)}

						<div className={styles["contributors-list-wrapper"]}>
							<ContributorsList
								activityLogs={projectContributorsActivity}
								contributors={projectContributors}
								hasEditPermission={hasEditContributorPermission}
								hasMergePermission={hasMergeContributorPermission}
								isLoading={isContributorsDataLoading}
								onEditContributor={handleEditContributor}
								onMergeContributor={handleMergeContributor}
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
						isOpened={isContributorUpdateModalOpen}
						onClose={handleContributorUpdateModalClose}
						title="Update Contributor"
					>
						{contributorToEdit && (
							<ContributorUpdateForm
								contributor={contributorToEdit}
								onSubmit={handleContributorUpdateSubmit}
							/>
						)}
					</Modal>

					<Modal
						isOpened={isContributorMergeModalOpen}
						onClose={handleContributorMergeModalClose}
						title="Merge contributors"
					>
						{contributorToMerge && (
							<ContributorMergeForm
								allContributors={projectContributors}
								currentContributor={contributorToMerge}
								onSubmit={handleContributorMergeSubmit}
							/>
						)}
					</Modal>

					<SetupAnalyticsModal
						isOpened={isSetupAnalyticsModalOpened}
						onClose={onSetupAnalyticsModalClose}
						project={project}
					/>

					<ConfirmationModal
						content="The project will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
						isOpened={isDeleteModalOpen}
						onClose={handleDeleteModalClose}
						onConfirm={handleProjectDeleteConfirm}
					/>
				</>
			)}
		</PageLayout>
	);
};

export { Project };
