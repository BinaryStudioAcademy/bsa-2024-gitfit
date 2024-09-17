import {
	Breadcrumbs,
	Button,
	Modal,
	PageLayout,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePagination,
	useParams,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ProjectGroupCreateRequestDto } from "~/modules/project-groups/project-groups.js";
import { actions as projectGroupActions } from "~/modules/project-groups/project-groups.js";
import { actions as projectActions } from "~/modules/projects/projects.js";
import { actions as userActions } from "~/modules/users/users.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import {
	ProjectGroupCreateForm,
	ProjectGroupsTable,
	UsersTable,
} from "./libs/components/components.js";
import { filterUserProjectGroups } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const ProjectAccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const { project, projectStatus: projectDataStatus } = useAppSelector(
		({ projects }) => projects,
	);

	const {
		dataStatus: projectGroupsDataStatus,
		projectGroupCreateStatus,
		projectGroups,
		projectGroupsTotalCount,
	} = useAppSelector(({ projectGroups }) => projectGroups);

	const {
		dataStatus: usersDataStatus,
		users,
		usersTotalCount,
	} = useAppSelector(({ users }) => users);

	const usersWithCurrentProjectGroups = filterUserProjectGroups(
		users,
		projectGroups,
	);

	const hasProject = project !== null;
	const projectRoute = hasProject
		? configureString(AppRoute.PROJECT, {
				id: project.id.toString(),
			})
		: "";

	const {
		onPageChange: onUserPageChange,
		onPageSizeChange: onUserPageSizeChange,
		page: userPage,
		pageSize: userPageSize,
	} = usePagination({
		queryParameterPrefix: "project-user",
		totalItemsCount: usersTotalCount,
	});

	const {
		onPageChange: onGroupPageChange,
		onPageSizeChange: onGroupPageSizeChange,
		page: groupPage,
		pageSize: groupPageSize,
	} = usePagination({
		queryParameterPrefix: "project-group",
		totalItemsCount: projectGroupsTotalCount,
	});

	const {
		isOpened: isCreateModalOpened,
		onClose: onCreateModalClose,
		onOpen: onCreateModalOpen,
	} = useModal();

	useEffect(() => {
		if (id) {
			void dispatch(projectActions.getById({ id }));
		}
	}, [dispatch, id]);

	const handleLoadUsers = useCallback(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
	}, [dispatch, userPage, userPageSize]);

	const handleLoadGroups = useCallback(() => {
		if (id) {
			void dispatch(
				projectGroupActions.loadAllByProjectId({
					projectId: id,
					query: { page: groupPage, pageSize: groupPageSize },
				}),
			);
		}
	}, [dispatch, groupPage, groupPageSize, id]);

	useEffect(() => {
		handleLoadUsers();
	}, [handleLoadUsers]);

	useEffect(() => {
		handleLoadGroups();
	}, [handleLoadGroups]);

	const handleProjectGroupCreateSubmit = useCallback(
		(payload: ProjectGroupCreateRequestDto) => {
			void dispatch(projectGroupActions.create(payload));
		},
		[dispatch],
	);

	useEffect(() => {
		if (projectGroupCreateStatus === DataStatus.FULFILLED) {
			onCreateModalClose();
		}
	}, [projectGroupCreateStatus, onCreateModalClose]);

	const isUsersLoading =
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING;

	const isProjectLoading =
		projectDataStatus === DataStatus.IDLE ||
		projectDataStatus === DataStatus.PENDING;

	const isProjectGroupsLoading =
		projectGroupsDataStatus === DataStatus.IDLE ||
		projectGroupsDataStatus === DataStatus.PENDING;

	const isLoading =
		isUsersLoading || isProjectLoading || isProjectGroupsLoading;

	const isRejected = projectDataStatus === DataStatus.REJECTED;

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
								{ href: AppRoute.ROOT, label: "Projects" },
								{
									href: projectRoute as ValueOf<typeof AppRoute>,
									label: project.name,
								},
								{ label: "Access Management" },
							]}
						/>
					</div>
					<h1 className={styles["title"]}>Access Management</h1>
					<section>
						<div className={styles["section-header"]}>
							<h2 className={styles["section-title"]}>Users</h2>
						</div>
						<UsersTable
							onPageChange={onUserPageChange}
							onPageSizeChange={onUserPageSizeChange}
							page={userPage}
							pageSize={userPageSize}
							totalItemsCount={usersTotalCount}
							users={usersWithCurrentProjectGroups}
						/>
					</section>
					<section>
						<div className={styles["section-header"]}>
							<h2 className={styles["section-title"]}>Groups</h2>
							<div>
								<Button label="Create New" onClick={onCreateModalOpen} />
							</div>
						</div>
						<ProjectGroupsTable
							onPageChange={onGroupPageChange}
							onPageSizeChange={onGroupPageSizeChange}
							page={groupPage}
							pageSize={groupPageSize}
							projectGroups={projectGroups}
							totalItemsCount={projectGroupsTotalCount}
						/>
					</section>
					<Modal
						isOpened={isCreateModalOpened}
						onClose={onCreateModalClose}
						title="Create new group"
					>
						<ProjectGroupCreateForm
							onSubmit={handleProjectGroupCreateSubmit}
							projectId={project.id}
						/>
					</Modal>
				</>
			)}
		</PageLayout>
	);
};

export { ProjectAccessManagement };
