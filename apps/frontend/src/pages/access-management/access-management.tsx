import {
	Button,
	Modal,
	PageLayout,
	Table,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useModal,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
} from "~/modules/groups/groups.js";
import { actions as userActions } from "~/modules/users/users.js";

import { GroupCreateForm } from "./components/group-create-form/group-create-form.js";
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
	const { dataStatus: usersDataStatus, users } = useAppSelector(
		({ users }) => users,
	);
	const {
		dataStatus: groupsDataStatus,
		groupCreateStatus,
		groups,
	} = useAppSelector(({ groups }) => groups);
	useEffect(() => {
		void dispatch(userActions.loadAll());
		void dispatch(groupActions.loadAll());
	}, [dispatch]);

	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	useEffect(() => {
		if (groupCreateStatus === DataStatus.FULFILLED) {
			onModalClose();
		}
	}, [groupCreateStatus, onModalClose]);

	const handleGroupCreateSubmit = useCallback(
		(payload: GroupCreateRequestDto) => {
			void dispatch(groupActions.create(payload));
		},
		[dispatch],
	);

	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);
	const usersTableData = { userColumns, userData };

	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

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
				<Table<UserRow> columns={userColumns} data={userData} />
			</section>
			<section>
				<div className={styles["section-header"]}>
					<h2 className={styles["section-title"]}>Groups</h2>
					<Button label="Create New" onClick={onModalOpen} />
				</div>
				<Table<GroupRow> columns={groupColumns} data={groupData} />
			</section>
			<Modal
				isModalOpened={isModalOpened}
				onModalClose={onModalClose}
				title="Create new group"
			>
				<GroupCreateForm
					onSubmit={handleGroupCreateSubmit}
					users={usersTableData}
				/>
			</Modal>
		</PageLayout>
	);
};

export { AccessManagement };
