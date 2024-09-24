import {
	Breadcrumbs,
	Button,
	ConfirmationModal,
	Modal,
	PageLayout,
	Search,
} from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePagination,
	useParams,
	useSearchFilters,
	useState,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllItemResponseDto,
	type ProjectGroupPatchRequestDto,
} from "~/modules/project-groups/project-groups.js";
import { actions as projectGroupActions } from "~/modules/project-groups/project-groups.js";
import { actions as projectActions } from "~/modules/projects/projects.js";
import { actions as userActions } from "~/modules/users/users.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import {
	ProjectGroupCreateForm,
	ProjectGroupsTable,
	ProjectGroupUpdateForm,
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
		projectGroupDeleteStatus,
		projectGroups,
		projectGroupsTotalCount,
		projectGroupUpdateStatus,
	} = useAppSelector(({ projectGroups }) => projectGroups);

	const {
		dataStatus: usersDataStatus,
		users,
		usersTotalCount,
	} = useAppSelector(({ users }) => users);

	const { onSearch: onUserSearch, search: userSearch } = useSearchFilters();
	const { control, errors } = useAppForm({
		defaultValues: { userSearch },
	});

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

	const {
		isOpened: isUpdateModalOpened,
		onClose: onUpdateModalClose,
		onOpen: onUpdateModalOpen,
	} = useModal();

	const {
		isOpened: isDeleteModalOpen,
		onClose: onDeleteModalClose,
		onOpen: onDeleteModalOpen,
	} = useModal();

	useEffect(() => {
		if (id) {
			void dispatch(projectActions.getById({ id }));
		}
	}, [dispatch, id]);

	const handleLoadUsers = useCallback(() => {
		void dispatch(
			userActions.loadAll({
				name: userSearch,
				page: userPage,
				pageSize: userPageSize,
			}),
		);
	}, [dispatch, userPage, userPageSize, userSearch]);

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

	const [projectGroupToEdit, setProjectGroupToEdit] =
		useState<null | ProjectGroupGetAllItemResponseDto>(null);
	const hasProjectGroupToEdit = projectGroupToEdit !== null;

	const [projectGroupToDeleteId, setProjectGroupToDeleteId] = useState<
		null | number
	>(null);
	const hasProjectGroupToDelete = Boolean(projectGroupToDeleteId);

	const handleProjectGroupCreateSubmit = useCallback(
		(payload: ProjectGroupCreateRequestDto) => {
			void dispatch(projectGroupActions.create(payload));
		},
		[dispatch],
	);

	const handleGroupUpdateSubmit = useCallback(
		(id: number, payload: ProjectGroupPatchRequestDto) => {
			void dispatch(projectGroupActions.patch({ id, payload }));
		},
		[dispatch],
	);

	const handleGroupDeleteSubmit = useCallback((): void => {
		if (hasProjectGroupToDelete) {
			void dispatch(
				projectGroupActions.deleteById({
					id: projectGroupToDeleteId as number,
				}),
			);
		}
	}, [hasProjectGroupToDelete, dispatch, projectGroupToDeleteId]);

	const handleEdit = useCallback(
		(payload: ProjectGroupGetAllItemResponseDto): void => {
			setProjectGroupToEdit(payload);
			onUpdateModalOpen();
		},
		[onUpdateModalOpen],
	);

	const handleDelete = useCallback(
		(id: number): void => {
			setProjectGroupToDeleteId(id);
			onDeleteModalOpen();
		},
		[onDeleteModalOpen],
	);

	useEffect(() => {
		if (projectGroupCreateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onCreateModalClose();
		}
	}, [projectGroupCreateStatus, onCreateModalClose, handleLoadUsers]);

	useEffect(() => {
		if (projectGroupUpdateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onUpdateModalClose();
			setProjectGroupToEdit(null);
		}
	}, [
		projectGroupUpdateStatus,
		onUpdateModalClose,
		handleLoadUsers,
		setProjectGroupToEdit,
	]);

	useEffect(() => {
		if (projectGroupDeleteStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			handleLoadGroups();
			onDeleteModalClose();
			setProjectGroupToDeleteId(null);
		}
	}, [
		projectGroupDeleteStatus,
		onDeleteModalClose,
		handleLoadUsers,
		handleLoadGroups,
	]);

	const isUsersLoading =
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING;

	const isProjectLoading =
		projectDataStatus === DataStatus.IDLE ||
		projectDataStatus === DataStatus.PENDING;

	const isProjectGroupsLoading =
		projectGroupsDataStatus === DataStatus.IDLE ||
		projectGroupsDataStatus === DataStatus.PENDING;

	const isLoading = isProjectLoading;

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
						<div className={styles["search-container"]}>
							<Search
								control={control}
								errors={errors}
								isLabelHidden
								label="Users search"
								name="userSearch"
								onChange={onUserSearch}
								placeholder="Enter name"
							/>
						</div>
						<UsersTable
							isLoading={isUsersLoading}
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
							isLoading={isProjectGroupsLoading}
							onDelete={handleDelete}
							onEdit={handleEdit}
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

					{hasProjectGroupToEdit && (
						<Modal
							isOpened={isUpdateModalOpened}
							onClose={onUpdateModalClose}
							title="Update group"
						>
							<ProjectGroupUpdateForm
								onSubmit={handleGroupUpdateSubmit}
								projectGroup={projectGroupToEdit}
							/>
						</Modal>
					)}

					{hasProjectGroupToDelete && (
						<ConfirmationModal
							content="The group will be deleted. This action cannot be undone. Do you want to continue?"
							isOpened={isDeleteModalOpen}
							onClose={onDeleteModalClose}
							onConfirm={handleGroupDeleteSubmit}
						/>
					)}
				</>
			)}
		</PageLayout>
	);
};

export { ProjectAccessManagement };
