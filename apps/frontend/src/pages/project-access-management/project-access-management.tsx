import {
	Breadcrumbs,
	Button,
	Modal,
	PageLayout,
	Table,
	TablePagination,
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
import { actions as userActions } from "~/modules/users/users.js";

import { ProjectGroupCreateForm } from "./components/components.js";
import {
	getGroupColumns,
	getGroupRows,
	getUserColumns,
	getUserRows,
} from "./libs/helpers/helpers.js";
import { type GroupRow, type UserRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const ProjectAccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	const { project } = useAppSelector(({ projects }) => projects);

	const hasProject = Boolean(project);

	const projectRoute = hasProject
		? configureString(AppRoute.PROJECT, {
				id: (project as ProjectGetAllItemResponseDto).id.toString(),
			})
		: "";

	const { dataStatus: usersDataStatus, usersTotalCount } = useAppSelector(
		({ users }) => users,
	);

	const { dataStatus: projectGroupsDataStatus, projectGroups } = useAppSelector(
		({ projectGroups }) => projectGroups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: usersTotalCount,
	});

	useEffect(() => {
		void dispatch(userActions.loadAll({ page, pageSize }));

		if (id) {
			void dispatch(projectActions.getById({ id }));
			void dispatch(projectGroupActions.loadAllByProjectId(id));
		}
	}, [dispatch, page, pageSize, id]);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(projectGroups);

	const projectGroupColumns = getGroupColumns();
	const projectGroupData: GroupRow[] = getGroupRows(projectGroups);

	const {
		isOpened: isCreateModalOpen,
		onClose: handleCreateModalClose,
		onOpen: handleCreateModalOpen,
	} = useModal();

	const handleProjectGroupCreateSubmit = useCallback(
		(payload: ProjectGroupCreateRequestDto) => {
			void dispatch(projectGroupActions.create(payload))
				.unwrap()
				.then(() => {
					handleCreateModalClose();
				});
		},
		[dispatch, handleCreateModalClose],
	);

	const isLoading = [usersDataStatus, projectGroupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

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
				<h2 className={styles["user-section-title"]}>Users</h2>
				<div className={styles["users-table"]}>
					<Table<UserRow> columns={userColumns} data={userData} />
					<TablePagination
						onPageChange={onPageChange}
						onPageSizeChange={onPageSizeChange}
						page={page}
						pageSize={pageSize}
						totalItemsCount={usersTotalCount}
					/>
				</div>
			</section>
			<section>
				<div className={styles["section-wrapper"]}>
					<h2 className={styles["group-section-title"]}>Groups</h2>
					<Button label="Create New" onClick={handleCreateModalOpen} />
				</div>
				<Table<GroupRow>
					columns={projectGroupColumns}
					data={projectGroupData}
				/>
			</section>
			<Modal
				isOpened={isCreateModalOpen}
				onClose={handleCreateModalClose}
				title="Create new project"
			>
				{hasProject && (
					<ProjectGroupCreateForm
						data={projectGroups}
						onSubmit={handleProjectGroupCreateSubmit}
						projectId={(project as ProjectGetAllItemResponseDto).id}
					/>
				)}
			</Modal>
		</PageLayout>
	);
};

export { ProjectAccessManagement };
