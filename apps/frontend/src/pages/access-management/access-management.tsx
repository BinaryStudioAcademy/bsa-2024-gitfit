import { Button, Modal, PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
} from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupCreateForm } from "./components/group-create-form/group-create-form.js";
import { GroupsTable } from "./components/groups-table/groups-table.js";
import { UsersTable } from "./components/users-table/users-table.js";
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
		groups,
	} = useAppSelector(({ groups }) => groups);

	const {
		onPageChange: onUserPageChange,
		onPageSizeChange: onUserPageSizeChange,
		page: userPage,
		pageSize: userPageSize,
	} = usePagination({
		totalItemsCount: usersTotalCount,
	});

	const {
		onPageChange: onModalPageChange,
		onPageSizeChange: onModalPageSizeChange,
		page: modalPage,
		pageSize: modalPageSize,
	} = usePagination({
		totalItemsCount: usersTotalCount,
	});

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	useEffect(() => {
		void dispatch(
			userActions.loadAll({ page: userPage, pageSize: userPageSize }),
		);
		void dispatch(groupActions.loadAll());
	}, [
		dispatch,
		isModalOpened,
		modalPage,
		modalPageSize,
		userPage,
		userPageSize,
	]);

	useEffect(() => {
		if (isModalOpened) {
			void dispatch(
				userActions.loadAll({ page: modalPage, pageSize: modalPageSize }),
			);
		}
	}, [dispatch, isModalOpened, modalPage, modalPageSize]);

	useEffect(() => {
		if (groupCreateStatus === DataStatus.FULFILLED) {
			onModalClose();
		}
	}, [groupCreateStatus, onModalClose, isModalOpened]);

	const handleGroupCreateSubmit = useCallback(
		(payload: GroupCreateRequestDto) => {
			void dispatch(groupActions.create(payload));
		},
		[dispatch],
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
				<GroupsTable groups={groups} />
			</section>
			<Modal
				isModalOpened={isModalOpened}
				onModalClose={onModalClose}
				title="Create new group"
			>
				<GroupCreateForm
					onPageChange={onModalPageChange}
					onPageSizeChange={onModalPageSizeChange}
					onSubmit={handleGroupCreateSubmit}
					page={modalPage}
					pageSize={modalPageSize}
					totalItemsCount={usersTotalCount}
					users={users}
				/>
			</Modal>
		</PageLayout>
	);
};

export { AccessManagement };
