import {
	Breadcrumbs,
	Button,
	ConfirmationModal,
	Modal,
	Navigate,
	PageLayout,
} from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	AppRoute,
	DataStatus,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
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
	type ContributorSplitRequestDto,
} from "~/modules/contributors/contributors.js";
import {
	actions as projectActions,
	type ProjectPatchRequestDto,
} from "~/modules/projects/projects.js";
import {
	ContributorMergeForm,
	ContributorSplitForm,
	ContributorUpdateForm,
} from "~/pages/contributors/libs/components/components.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { ProjectUpdateForm } from "~/pages/projects/libs/components/components.js";

import {
	ContributorsList,
	ProjectDetailsMenu,
	SetupAnalyticsModal,
} from "./libs/components/components.js";
import { checkIsProjectPermitted } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<{ id: string }>();

	const {
		project,
		projectContributors,
		projectContributorsActivity,
		projectContributorsStatus,
		projectDeleteStatus,
		projectPatchStatus,
		projectStatus,
	} = useAppSelector(({ projects }) => projects);

	const { projectUserPermissions, userPermissions } = useAppSelector(
		({ auth }) => auth,
	);

	const {
		mergeContributorsStatus,
		splitContributorsStatus,
		updateContributorsStatus,
	} = useAppSelector(({ contributors }) => contributors);

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

	const {
		isOpened: isContributorSplitModalOpen,
		onClose: handleContributorSplitModalClose,
		onOpen: handleContributorSplitModalOpen,
	} = useModal();

	const [contributorToEdit, setContributorToEdit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToMerge, setContributorToMerge] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const [contributorToSplit, setContributorToSplit] =
		useState<ContributorGetAllItemResponseDto | null>(null);

	const hasViewPermission =
		checkHasPermission(
			[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_ALL_PROJECTS],
			userPermissions,
		) ||
		checkIsProjectPermitted({
			permissions: [
				ProjectPermissionKey.VIEW_PROJECT,
				ProjectPermissionKey.EDIT_PROJECT,
				ProjectPermissionKey.MANAGE_PROJECT,
			],
			projectId,
			projectUserPermissions,
		});

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));

			if (hasViewPermission) {
				void dispatch(
					projectActions.loadAllContributorsByProjectId(Number(projectId)),
				);
			}
		}
	}, [dispatch, hasViewPermission, projectId]);

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
						projectId: Number(projectId),
					}),
				);
			}
		},
		[dispatch, contributorToEdit, projectId],
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
			}
		},
		[contributorToMerge, dispatch],
	);

	const handleSplitContributor = useCallback(
		(contributorId: number) => {
			const contributor = projectContributors.find(
				(contributor) => contributor.id === contributorId,
			);

			if (contributor) {
				setContributorToSplit(contributor);
				handleContributorSplitModalOpen();
			}
		},
		[handleContributorSplitModalOpen, projectContributors],
	);

	const handleContributorSplitSubmit = useCallback(
		(payload: ContributorSplitRequestDto) => {
			if (contributorToSplit) {
				void dispatch(
					contributorActions.split({ id: contributorToSplit.id, payload }),
				);
			}
		},
		[contributorToSplit, dispatch],
	);

	useEffect(() => {
		if (updateContributorsStatus === DataStatus.FULFILLED) {
			handleContributorUpdateModalClose();
			setContributorToEdit(null);
		}
	}, [
		updateContributorsStatus,
		handleContributorUpdateModalClose,
		setContributorToEdit,
	]);

	useEffect(() => {
		if (mergeContributorsStatus === DataStatus.FULFILLED) {
			handleContributorMergeModalClose();
			setContributorToMerge(null);
		}
	}, [
		mergeContributorsStatus,
		handleContributorMergeModalClose,
		setContributorToMerge,
	]);

	useEffect(() => {
		if (splitContributorsStatus === DataStatus.FULFILLED) {
			handleContributorSplitModalClose();
			setContributorToSplit(null);

			void dispatch(
				projectActions.loadAllContributorsByProjectId(Number(projectId)),
			);
		}
	}, [
		dispatch,
		projectId,
		splitContributorsStatus,
		handleContributorSplitModalClose,
		setContributorToSplit,
	]);

	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;

	const isContributorsDataLoading =
		projectContributorsStatus === DataStatus.PENDING ||
		projectContributorsStatus === DataStatus.IDLE;

	const isRejected = projectStatus === DataStatus.REJECTED;

	const hasProject = project !== null;
	const projectPermissions = Object.values(projectUserPermissions).flat();

	const combinedPermissions = [...projectPermissions, ...userPermissions];

	const hasManagePermission =
		checkHasPermission(
			[ProjectPermissionKey.MANAGE_PROJECT],
			combinedPermissions,
		) &&
		checkIsProjectPermitted({
			permissions: [ProjectPermissionKey.MANAGE_PROJECT],
			projectId,
			projectUserPermissions,
		});

	const hasEditPermission =
		checkHasPermission(
			[ProjectPermissionKey.EDIT_PROJECT],
			combinedPermissions,
		) &&
		checkIsProjectPermitted({
			permissions: [ProjectPermissionKey.EDIT_PROJECT],
			projectId,
			projectUserPermissions,
		});

	const hasManageAllProjectsPermission =
		checkHasPermission(
			[PermissionKey.MANAGE_ALL_PROJECTS],
			combinedPermissions,
		) || hasManagePermission;

	const hasSetupAnalyticsPermission =
		hasManageAllProjectsPermission || hasEditPermission;

	const hasDeleteProjectsPermissions = checkHasPermission(
		[PermissionKey.MANAGE_ALL_PROJECTS],
		combinedPermissions,
	);

	const hasEditContributorPermission = hasManageAllProjectsPermission;
	const hasMergeContributorPermission = hasManageAllProjectsPermission;
	const hasSplitContributorPermission = hasManageAllProjectsPermission;

	const hasContributors = projectContributors.length > EMPTY_LENGTH;

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
								hasDeleteProjectsPermissions={hasDeleteProjectsPermissions}
								hasEditPermission={hasEditPermission}
								hasManagePermission={hasManagePermission}
								onDelete={handleDeleteProject}
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

						{hasSetupAnalyticsPermission && !hasContributors && (
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
								analyticsLastSyncedAt={project.analyticsLastSyncedAt}
								analyticsLastSyncedByUser={project.analyticsLastSyncedByUser}
								contributors={projectContributors}
								hasContributors={hasContributors}
								hasEditPermission={hasEditContributorPermission}
								hasMergePermission={hasMergeContributorPermission}
								hasSetupAnalyticsPermission={hasSetupAnalyticsPermission}
								hasSplitPermission={hasSplitContributorPermission}
								isLoading={isContributorsDataLoading}
								onClickSetupAgain={onSetupAnalyticsModalOpen}
								onEditContributor={handleEditContributor}
								onMergeContributor={handleMergeContributor}
								onSplitContributor={handleSplitContributor}
								projectId={projectId as string}
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

					<Modal
						isOpened={isContributorSplitModalOpen}
						onClose={handleContributorSplitModalClose}
						title="Split contributors"
					>
						{contributorToSplit && (
							<ContributorSplitForm
								currentContributor={contributorToSplit}
								onSubmit={handleContributorSplitSubmit}
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
