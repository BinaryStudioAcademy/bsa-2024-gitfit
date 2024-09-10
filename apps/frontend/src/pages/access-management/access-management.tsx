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
} from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import {
	GroupCreateForm,
	GroupsTable,
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
		groups,
		groupsTotalCount,
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
		isOpened: isModalOpened,
		onClose: onModalClose,
		onOpen: onModalOpen,
	} = useModal();

	const {
		isOpened: isDeleteModalOpen,
		onClose: onDeleteModalClose,
		onOpen: onDeleteModalOpen,
	} = useModal();

	const [groupId, setGroupId] = useState<null | number>(null);

	useEffect(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
		void dispatch(
			groupActions.loadAll({ page: groupPage, pageSize: groupPageSize }),
		);
	}, [dispatch, userPage, userPageSize, groupPage, groupPageSize]);

	const handleGroupCreateSubmit = useCallback(
		(payload: GroupCreateRequestDto): void => {
			void dispatch(
				groupActions.create({
					payload,
					query: { page: userPage, pageSize: userPageSize },
				}),
			);
			onModalClose();
		},
		[dispatch, onModalClose, userPage, userPageSize],
	);

	const handleGroupDelete = useCallback((): void => {
		if (groupId !== null) {
			void dispatch(
				groupActions.deleteById({
					groupQuery: { page: groupPage, pageSize: groupPageSize },
					id: groupId,
					userQuery: { page: userPage, pageSize: userPageSize },
				}),
			);

			setGroupId(null);
			onDeleteModalClose();
		}
	}, [
		dispatch,
		groupId,
		userPage,
		userPageSize,
		groupPage,
		groupPageSize,
		onDeleteModalClose,
	]);

	const onDelete = useCallback(
		(id: number): void => {
			setGroupId(id);
			onDeleteModalOpen();
		},
		[onDeleteModalOpen],
	);

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
					<Button label="Create New" onClick={onModalOpen} />
				</div>
				<GroupsTable
					groups={groups}
					onDelete={onDelete}
					onPageChange={onGroupPageChange}
					onPageSizeChange={onGroupPageSizeChange}
					page={groupPage}
					pageSize={groupPageSize}
					totalItemsCount={groupsTotalCount}
				/>
			</section>
			<Modal
				isOpened={isModalOpened}
				onClose={onModalClose}
				title="Create new group"
			>
				<GroupCreateForm onSubmit={handleGroupCreateSubmit} />
			</Modal>
			{groupId !== null && (
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
