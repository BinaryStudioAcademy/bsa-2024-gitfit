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
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupMenu } from "./libs/components/components.js";
import {
	getGroupColumns,
	getGroupRows,
	getUserColumns,
	getUserRows,
} from "./libs/helpers/helpers.js";
import { type GroupRow, type UserRow } from "./libs/types/types.js";
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

	const [selectedGroupId, setSelectedGroupId] = useState<null | number>(null);
	const {
		isOpened: isConfirmationModalOpen,
		onClose: handleConfirmationModalClose,
		onOpen: handleConfirmationModalOpen,
	} = useModal();

	const handleDelete = useCallback(
		(groupId: number) => {
			setSelectedGroupId(groupId);
			handleConfirmationModalOpen();
		},
		[handleConfirmationModalOpen],
	);

	const handleDeleteConfirm = useCallback(() => {
		if (selectedGroupId !== null) {
			void dispatch(groupActions.deleteById(selectedGroupId));
		}
	}, [dispatch, selectedGroupId]);

	useEffect(() => {
		void dispatch(userActions.loadAll({ page, pageSize }));
		void dispatch(groupActions.loadAll());
	}, [dispatch, page, pageSize]);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

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
				<Table<GroupRow>
					columns={groupColumns}
					data={groupData.map((group) => ({
						...group,
						options: <GroupMenu groupId={group.id} onDelete={handleDelete} />,
					}))}
				/>
			</section>
			<ConfirmationModal
				cancelLabel="Cancel"
				confirmationText="This group will be deleted. This action cannot be undone. Do you want to continue?"
				confirmLabel="Yes, Delete it"
				isModalOpened={isConfirmationModalOpen}
				onConfirm={handleDeleteConfirm}
				onModalClose={handleConfirmationModalClose}
				title="Are you sure?"
			/>
		</PageLayout>
	);
};

export { AccessManagement };
