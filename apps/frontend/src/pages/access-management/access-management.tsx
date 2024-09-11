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

	const fetchUsers = useCallback(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
	}, [dispatch, userPage, userPageSize]);

	const fetchGroups = useCallback(() => {
		void dispatch(
			groupActions.loadAll({ page: groupPage, pageSize: groupPageSize }),
		);
	}, [dispatch, groupPage, groupPageSize]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	useEffect(() => {
		fetchGroups();
	}, [fetchGroups]);

	const handleGroupCreateSubmit = useCallback(
		(payload: GroupCreateRequestDto): void => {
			void dispatch(groupActions.create(payload));
		},
		[dispatch],
	);

	const [groupToEdit, setGroupToEdit] =
		useState<GroupGetAllItemResponseDto | null>(null);
	const hasGroupToEdit = groupToEdit !== null;

	const handleGroupUpdateSubmit = useCallback(
		(id: number, payload: GroupUpdateRequestDto) => {
			void dispatch(groupActions.update({ id, payload }));
		},
		[dispatch],
	);

	const onEdit = useCallback(
		(group: GroupGetAllItemResponseDto): void => {
			setGroupToEdit(group);
			onUpdateModalOpen();
		},
		[onUpdateModalOpen],
	);

	const [selectedGroupId, setSelectedGroupId] = useState<null | number>(null);
	const hasSelectedGroup = Boolean(selectedGroupId);

	const handleGroupDelete = useCallback((): void => {
		if (hasSelectedGroup) {
			void dispatch(groupActions.deleteById({ id: selectedGroupId as number }));
		}
	}, [hasSelectedGroup, dispatch, selectedGroupId]);

	const onDelete = useCallback(
		(id: number): void => {
			setSelectedGroupId(id);
			onDeleteModalOpen();
		},
		[onDeleteModalOpen],
	);

	const setValidPage = useCallback(() => {
		const maxGroupPages = Math.ceil(groupsTotalCount / groupPageSize);
		const maxUserPages = Math.ceil(usersTotalCount / userPageSize);
		const validGroupPage = Math.min(groupPage, maxGroupPages);
		const validUserPage = Math.min(userPage, maxUserPages);
		onGroupPageChange(validGroupPage);
		onUserPageChange(validUserPage);
	}, [
		groupPage,
		groupsTotalCount,
		groupPageSize,
		onGroupPageChange,
		userPage,
		usersTotalCount,
		userPageSize,
		onUserPageChange,
	]);

	useEffect(() => {
		if (groupCreateStatus === DataStatus.FULFILLED) {
			setValidPage();
			fetchUsers();
			onCreateModalClose();
		}
	}, [groupCreateStatus, onCreateModalClose, setValidPage, fetchUsers]);

	useEffect(() => {
		if (groupUpdateStatus === DataStatus.FULFILLED) {
			fetchUsers();
			onUpdateModalClose();
			setGroupToEdit(null);
		}
	}, [groupUpdateStatus, onUpdateModalClose, fetchUsers]);

	useEffect(() => {
		if (groupDeleteStatus === DataStatus.FULFILLED) {
			setValidPage();
			fetchUsers();
			onDeleteModalClose();
			setSelectedGroupId(null);
		}
	}, [groupDeleteStatus, onDeleteModalClose, setValidPage, fetchUsers]);

	const isLoading = [usersDataStatus, groupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<PageLayout isLoading={isLoading}>
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
					<Button label="Create New" onClick={onCreateModalOpen} />
				</div>

				<GroupsTable
					groups={groups}
					onDelete={onDelete}
					onEdit={onEdit}
					onPageChange={onGroupPageChange}
					onPageSizeChange={onGroupPageSizeChange}
					page={groupPage}
					pageSize={groupPageSize}
					totalItemsCount={groupsTotalCount}
				/>
			</section>

			<Modal
				isOpened={isCreateModalOpened}
				onClose={onCreateModalClose}
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

			{hasSelectedGroup && (
				<ConfirmationModal
					content="The group will be deleted. This action cannot be undone. Do you want to continue?"
					isOpened={isDeleteModalOpen}
					onClose={onDeleteModalClose}
					onConfirm={handleGroupDelete}
				/>
			)}
		</PageLayout>
	);
};

export { AccessManagement };
