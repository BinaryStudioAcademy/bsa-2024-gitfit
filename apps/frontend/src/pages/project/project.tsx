import {
	Breadcrumbs,
	Button,
	PageLayout,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useModal,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as projectActions } from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import {
	ProjectDetailsMenu,
	SetupAnalyticsModal,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Project = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams<{ id: string }>();

	const { project, projectStatus } = useAppSelector(({ projects }) => projects);
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const mainPermission = authenticatedUser
		? authenticatedUser.groups.flatMap((group) => group.permissions)
		: [];

	const projectPermission = authenticatedUser
		? authenticatedUser.projectGroups.flatMap(
				(projectGroup) => projectGroup.permissions,
			)
		: [];
	const userPermissions = [...projectPermission, ...mainPermission];

	const hasManagePermission =
		checkHasPermission(
			[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_PROJECT],
			userPermissions,
		) &&
		authenticatedUser?.projectGroups.map((project) =>
			project.projectId.map((id) => id === project.id),
		);

	const hasEditPermission =
		checkHasPermission(
			[
				PermissionKey.VIEW_ALL_PROJECTS,
				PermissionKey.MANAGE_PROJECT,
				PermissionKey.EDIT_PROJECT,
			],
			userPermissions,
		) &&
		authenticatedUser?.projectGroups.map((project) =>
			project.projectId.map((id) => id === project.id),
		);

	const {
		isOpened: isSetupAnalyticsModalOpened,
		onClose: onSetupAnalyticsModalClose,
		onOpen: onSetupAnalyticsModalOpen,
	} = useModal();

	useEffect(() => {
		if (projectId) {
			void dispatch(projectActions.getById({ id: projectId }));
		}
	}, [dispatch, projectId]);

	const isLoading =
		projectStatus === DataStatus.PENDING || projectStatus === DataStatus.IDLE;

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
								hasPermission={hasManagePermission}
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
						{hasEditPermission && (
							<div>
								<Button
									label="Setup Analytics"
									onClick={onSetupAnalyticsModalOpen}
								/>
							</div>
						)}
					</div>

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
