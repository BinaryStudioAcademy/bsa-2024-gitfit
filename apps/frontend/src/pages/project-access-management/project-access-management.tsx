import {
	Breadcrumbs,
	Button,
	GroupsTable,
	Modal,
	PageLayout,
	UsersTable,
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
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";
import { actions as projectActions } from "~/modules/projects/projects.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import { ProjectGroupCreateForm } from "./components/components.js";
import { getUsersFromProjectGroups } from "./components/project-group-create-form/libs/helpers/helpers.js";
import styles from "./styles.module.css";

const ProjectAccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const {
		project,
		projectDataStatus,
		projectGroups,
		projectGroupsDataStatus,
		projectGroupsTotalCount,
	} = useAppSelector(({ projectGroups, projects }) => ({
		project: projects.project,
		projectDataStatus: projects.projectStatus,
		projectGroups: projectGroups.projectGroups,
		projectGroupsDataStatus: projectGroups.dataStatus,
		projectGroupsTotalCount: projectGroups.projectGroupsTotalCount,
	}));

	const hasProject = Boolean(project);
	const projectRoute = hasProject
		? configureString(AppRoute.PROJECT, {
				id: (project as ProjectGetAllItemResponseDto).id.toString(),
			})
		: "";

	const users = getUsersFromProjectGroups(projectGroups);
	const usersTotalCount = users.length;

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
		handleLoadGroups();
	}, [handleLoadGroups]);

	const handleProjectGroupCreateSubmit = useCallback(
		(payload: ProjectGroupCreateRequestDto) => {
			void dispatch(projectGroupActions.create(payload))
				.unwrap()
				.then(() => {
					onCreateModalClose();
				});
		},
		[dispatch, onCreateModalClose],
	);

	const isLoading = [projectDataStatus, projectGroupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	const isRejected = projectDataStatus === DataStatus.REJECTED;

	if (isRejected) {
		return <NotFound />;
	}

	return (
		<PageLayout isLoading={isLoading}>
			<div className={styles["breadcrumb-container"]}>
				{hasProject && (
					<Breadcrumbs
						items={[
							{ href: AppRoute.ROOT, label: "Projects" },
							{
								href: projectRoute as ValueOf<typeof AppRoute>,
								label: (project as ProjectGetAllItemResponseDto).name,
							},
							{ label: "Access Management" },
						]}
					/>
				)}
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
					users={users}
				/>
			</section>
			<section>
				<div className={styles["section-header"]}>
					<h2 className={styles["section-title"]}>Groups</h2>
					<div>
						<Button label="Create New" onClick={onCreateModalOpen} />
					</div>
				</div>
				<GroupsTable
					groups={projectGroups}
					onPageChange={onGroupPageChange}
					onPageSizeChange={onGroupPageSizeChange}
					page={groupPage}
					pageSize={groupPageSize}
					totalItemsCount={projectGroupsTotalCount}
				/>
			</section>
			<Modal
				isOpened={isCreateModalOpened}
				onClose={onCreateModalClose}
				title="Create new group"
			>
				{hasProject && (
					<ProjectGroupCreateForm
						onSubmit={handleProjectGroupCreateSubmit}
						projectGroups={projectGroups}
						projectId={(project as ProjectGetAllItemResponseDto).id}
					/>
				)}
			</Modal>
		</PageLayout>
	);
};

export { ProjectAccessManagement };
