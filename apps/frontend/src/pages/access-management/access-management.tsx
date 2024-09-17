import {
	Button,
	ConfirmationModal,
	Modal,
	PageLayout,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePagination,
	useSearch,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
} from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import {
	GroupCreateForm,
	GroupsTable,
	GroupUpdateForm,
	UsersTable,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		dataStatus: usersDataStatus,
		users,
		usersTotalCount,
	} = useAppSelector(({ users }) => users);

	const {
		dataStatus: groupsDataStatus,
		groupCreateStatus,
		groupDeleteStatus,
		groups,
		groupsTotalCount,
		groupUpdateStatus,
	} = useAppSelector(({ groups }) => groups);

	const {
		onPageChange: onUserPageChange,
		onPageSizeChange: onUserPageSizeChange,
		page: userPage,
		pageSize: userPageSize,
	} = usePagination({
		queryParameterPrefix: "user",
		totalItemsCount: usersTotalCount,
	});

	const {
		onPageChange: onGroupPageChange,
		onPageSizeChange: onGroupPageSizeChange,
		page: groupPage,
		pageSize: groupPageSize,
	} = usePagination({
		queryParameterPrefix: "group",
		totalItemsCount: groupsTotalCount,
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

	const handleLoadUsers = useCallback(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
	}, [dispatch, userPage, userPageSize]);

	const handleLoadGroups = useCallback(() => {
		void dispatch(
			groupActions.loadAll({ page: groupPage, pageSize: groupPageSize }),
		);
	}, [dispatch, groupPage, groupPageSize]);

	useEffect(() => {
		handleLoadUsers();
	}, [handleLoadUsers]);

	useEffect(() => {
		handleLoadGroups();
	}, [handleLoadGroups]);

	const handleGroupCreateSubmit = useCallback(
		(payload: GroupCreateRequestDto): void => {
			void dispatch(groupActions.create(payload));
		},
		[dispatch],
	);
	const { resetSearch } = useSearch();

	const handleCreateModalClose = useCallback((): void => {
		resetSearch();
		onCreateModalClose();
	}, [onCreateModalClose, resetSearch]);

	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);
	const hasGroupToEdit = groupToEdit !== null;

	const [groupToDeleteId, setGroupToDeleteId] = useState<null | number>(null);
	const hasGroupToDelete = Boolean(groupToDeleteId);

	const handleGroupUpdateSubmit = useCallback(
		(id: number, payload: GroupUpdateRequestDto) => {
			void dispatch(groupActions.update({ id, payload }));
		},
		[dispatch],
	);

	const handleGroupDeleteSubmit = useCallback((): void => {
		if (hasGroupToDelete) {
			void dispatch(groupActions.deleteById({ id: groupToDeleteId as number }));
		}
	}, [hasGroupToDelete, dispatch, groupToDeleteId]);

	const handleEdit = useCallback(
		(group: GroupGetAllItemResponseDto): void => {
			setGroupToEdit(group);
			onUpdateModalOpen();
		},
		[onUpdateModalOpen],
	);

	const handleDelete = useCallback(
		(id: number): void => {
			setGroupToDeleteId(id);
			onDeleteModalOpen();
		},
		[onDeleteModalOpen],
	);

	useEffect(() => {
		if (groupCreateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onCreateModalClose();
		}
	}, [groupCreateStatus, onCreateModalClose, handleLoadUsers]);

	useEffect(() => {
		if (groupUpdateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onUpdateModalClose();
			setGroupToEdit(null);
		}
	}, [groupUpdateStatus, onUpdateModalClose, handleLoadUsers]);

	useEffect(() => {
		if (groupDeleteStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			handleLoadGroups();
			onDeleteModalClose();
			setGroupToDeleteId(null);
		}
	}, [
		groupDeleteStatus,
		onDeleteModalClose,
		handleLoadUsers,
		handleLoadGroups,
	]);

	const isLoadingUsersData =
		usersDataStatus === DataStatus.IDLE ||
		usersDataStatus === DataStatus.PENDING;
	const isLoadingGroupsData =
		groupsDataStatus === DataStatus.IDLE ||
		groupsDataStatus === DataStatus.PENDING;

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Access Management</h1>

			<section>
				<div className={styles["section-header"]}>
					<h2 className={styles["section-title"]}>Users</h2>
				</div>
				<UsersTable
					isLoading={isLoadingUsersData}
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
					groups={groups}
					isLoading={isLoadingGroupsData}
					onDelete={handleDelete}
					onEdit={handleEdit}
					onPageChange={onGroupPageChange}
					onPageSizeChange={onGroupPageSizeChange}
					page={groupPage}
					pageSize={groupPageSize}
					totalItemsCount={groupsTotalCount}
				/>
			</section>

			<Modal
				isOpened={isCreateModalOpened}
				onClose={handleCreateModalClose}
				title="Create new group"
			>
				<GroupCreateForm onSubmit={handleGroupCreateSubmit} />
			</Modal>

			{hasGroupToEdit && (
				<Modal
					isOpened={isUpdateModalOpened}
					onClose={onUpdateModalClose}
					title="Update group"
				>
					<GroupUpdateForm
						group={groupToEdit}
						onSubmit={handleGroupUpdateSubmit}
					/>
				</Modal>
			)}

			{hasGroupToDelete && (
				<ConfirmationModal
					content="The group will be deleted. This action cannot be undone. Do you want to continue?"
					isOpened={isDeleteModalOpen}
					onClose={onDeleteModalClose}
					onConfirm={handleGroupDeleteSubmit}
				/>
			)}
		</PageLayout>
	);
};

export { AccessManagement };
