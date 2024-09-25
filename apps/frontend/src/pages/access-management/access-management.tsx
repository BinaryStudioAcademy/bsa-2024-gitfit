import {
	Button,
	ConfirmationModal,
	Modal,
	PageLayout,
	Search,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePagination,
	useSearchFilters,
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
		deleteStatus: userDeleteStatus,
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

	const { onSearch: onUserSearch, search: userSearch } = useSearchFilters();
	const { control, errors } = useAppForm({
		defaultValues: { userSearch },
	});

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
		isOpened: isUserDeleteModalOpen,
		onClose: onUserDeleteModalClose,
		onOpen: onUserDeleteModalOpen,
	} = useModal();

	const {
		isOpened: isGroupCreateModalOpened,
		onClose: onGroupCreateModalClose,
		onOpen: onGroupCreateModalOpen,
	} = useModal();

	const {
		isOpened: isGroupUpdateModalOpened,
		onClose: onGroupUpdateModalClose,
		onOpen: onGroupUpdateModalOpen,
	} = useModal();

	const {
		isOpened: isGroupDeleteModalOpen,
		onClose: onGroupDeleteModalClose,
		onOpen: onGroupDeleteModalOpen,
	} = useModal();

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

	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);
	const hasGroupToEdit = groupToEdit !== null;

	const [userToDeleteId, setUserToDeleteId] = useState<null | number>(null);
	const hasUserToDelete = Boolean(userToDeleteId);

	const handleUserDelete = useCallback(
		(id: number): void => {
			setUserToDeleteId(id);
			onUserDeleteModalOpen();
		},
		[onUserDeleteModalOpen],
	);

	const handleUserDeleteSubmit = useCallback((): void => {
		if (hasUserToDelete) {
			void dispatch(userActions.deleteById({ id: userToDeleteId as number }));
		}
	}, [hasUserToDelete, dispatch, userToDeleteId]);

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

	const handleGroupEdit = useCallback(
		(group: GroupGetAllItemResponseDto): void => {
			setGroupToEdit(group);
			onGroupUpdateModalOpen();
		},
		[onGroupUpdateModalOpen],
	);

	const handleGroupDelete = useCallback(
		(id: number): void => {
			setGroupToDeleteId(id);
			onGroupDeleteModalOpen();
		},
		[onGroupDeleteModalOpen],
	);

	useEffect(() => {
		if (userDeleteStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onUserDeleteModalClose();
			setUserToDeleteId(null);
		}
	}, [userDeleteStatus, onUserDeleteModalClose, handleLoadUsers]);

	useEffect(() => {
		if (groupCreateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onGroupCreateModalClose();
		}
	}, [groupCreateStatus, onGroupCreateModalClose, handleLoadUsers]);

	useEffect(() => {
		if (groupUpdateStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			onGroupUpdateModalClose();
			setGroupToEdit(null);
		}
	}, [groupUpdateStatus, onGroupUpdateModalClose, handleLoadUsers]);

	useEffect(() => {
		if (groupDeleteStatus === DataStatus.FULFILLED) {
			handleLoadUsers();
			handleLoadGroups();
			onGroupDeleteModalClose();
			setGroupToDeleteId(null);
		}
	}, [
		groupDeleteStatus,
		onGroupDeleteModalClose,
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
					isLoading={isLoadingUsersData}
					onDelete={handleUserDelete}
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
						<Button label="Create New" onClick={onGroupCreateModalOpen} />
					</div>
				</div>

				<GroupsTable
					groups={groups}
					isLoading={isLoadingGroupsData}
					onDelete={handleGroupDelete}
					onEdit={handleGroupEdit}
					onPageChange={onGroupPageChange}
					onPageSizeChange={onGroupPageSizeChange}
					page={groupPage}
					pageSize={groupPageSize}
					totalItemsCount={groupsTotalCount}
				/>
			</section>

			<Modal
				isOpened={isGroupCreateModalOpened}
				onClose={onGroupCreateModalClose}
				title="Create new group"
			>
				<GroupCreateForm onSubmit={handleGroupCreateSubmit} />
			</Modal>

			{hasGroupToEdit && (
				<Modal
					isOpened={isGroupUpdateModalOpened}
					onClose={onGroupUpdateModalClose}
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
					isOpened={isGroupDeleteModalOpen}
					onClose={onGroupDeleteModalClose}
					onConfirm={handleGroupDeleteSubmit}
				/>
			)}

			{hasUserToDelete && (
				<ConfirmationModal
					content="The user will be deleted. This action cannot be undone. Do you want to continue?"
					isOpened={isUserDeleteModalOpen}
					onClose={onUserDeleteModalClose}
					onConfirm={handleUserDeleteSubmit}
				/>
			)}
		</PageLayout>
	);
};

export { AccessManagement };
