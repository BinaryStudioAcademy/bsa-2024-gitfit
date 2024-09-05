import {
	ConfirmationModal,
	PageLayout,
	Table,
	TablePagination,
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
	type GroupGetAllItemResponseDto,
} from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupTable } from "./libs/components/components.js";
import { getUserColumns, getUserRows } from "./libs/helpers/helpers.js";
import { type UserRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const AccessManagement = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		dataStatus: usersDataStatus,
		users,
		usersTotalCount,
	} = useAppSelector(({ users }) => users);

	const { dataStatus: groupsDataStatus, groups } = useAppSelector(
		({ groups }) => groups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: usersTotalCount,
	});

	const [groupToDelete, setGroupToDelete] =
		useState<GroupGetAllItemResponseDto | null>(null);

	const {
		isOpened: isDeleteModalOpen,
		onClose: handleDeleteModalClose,
		onOpen: handleDeleteModalOpen,
	} = useModal();

	const handleDeleteClick = useCallback(
		(group: GroupGetAllItemResponseDto) => {
			setGroupToDelete(group);
			handleDeleteModalOpen();
		},
		[handleDeleteModalOpen],
	);

	const confirmDeleteGroup = useCallback(() => {
		if (groupToDelete) {
			void dispatch(groupActions.deleteById(groupToDelete.id));
			handleDeleteModalClose();
		}
	}, [dispatch, groupToDelete, handleDeleteModalClose]);

	useEffect(() => {
		void dispatch(userActions.loadAll({ page, pageSize }));
		void dispatch(groupActions.loadAll());
	}, [dispatch, page, pageSize]);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	const isLoading = [usersDataStatus, groupsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Access Management</h1>
			<section>
				<h2 className={styles["section-title"]}>Users</h2>
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
				<h2 className={styles["section-title"]}>Groups</h2>
				<GroupTable groups={groups} onDelete={handleDeleteClick} />
			</section>

			{groupToDelete && (
				<ConfirmationModal
					cancelLabel="Cancel"
					confirmationText="The group will be deleted. This action cannot be undone. Do you want to continue?"
					confirmLabel="Yes, Delete it"
					isModalOpened={isDeleteModalOpen}
					onConfirm={confirmDeleteGroup}
					onModalClose={handleDeleteModalClose}
					title="Are you sure?"
				/>
			)}
		</PageLayout>
	);
};

export { AccessManagement };
