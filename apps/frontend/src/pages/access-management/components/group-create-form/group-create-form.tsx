import { Button, Input, Loader, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";
import { actions as groupActions } from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";

import { UsersTable } from "../users-table/users-table.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import { getPermissionOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const EMPTY_SET_SIZE = 0;

type Properties = {
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
	onSubmit: (payload: GroupCreateRequestDto) => void;
};

const GroupCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { control, errors, handleSubmit, setValue } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues: DEFAULT_GROUP_CREATE_PAYLOAD,
			validationSchema: groupCreateValidationSchema,
		});

	const { dataStatus: permissionsDataStatus, permissions } = useAppSelector(
		({ permissions }) => permissions,
	);

	const { users, usersDataStatus, usersTotalCount } = useAppSelector(
		({ groups }) => groups,
	);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: usersTotalCount,
	});

	useEffect(() => {
		void dispatch(groupActions.configureGroupUsers({ page, pageSize }));
		void dispatch(permissionActions.loadAll());
	}, [dispatch, page, pageSize]);

	const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(
		new Set(),
	);

	const handleUserSelect = useCallback(
		(userId: number, isSelected: boolean) => {
			setSelectedUserIds((previousIds) => {
				const updatedIds = new Set(previousIds);

				if (isSelected) {
					updatedIds.add(userId);
				} else {
					updatedIds.delete(userId);
				}

				setValue("userIds", [...updatedIds]);

				return updatedIds;
			});
		},
		[setValue],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: GroupCreateRequestDto) => {
				onSubmit({
					name: formData.name,
					permissionIds: formData.permissionIds,
					userIds: formData.userIds,
				});
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const permissionOptions = getPermissionOptions(permissions);

	const isLoading = [usersDataStatus, permissionsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="given-name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<span className={styles["table-title"]}>Users</span>
			<UsersTable
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				onRowSelect={handleUserSelect}
				page={page}
				pageSize={pageSize}
				paginationBackground="secondary"
				selectedIds={selectedUserIds}
				totalItemsCount={usersTotalCount}
				users={users}
			/>
			{selectedUserIds.size === EMPTY_SET_SIZE && errors.userIds && (
				<div className={styles["error-message"]}>{errors.userIds.message}</div>
			)}
			<Select
				control={control}
				isMulti
				label="Permissions"
				name="permissionIds"
				options={permissionOptions}
				placeholder="Choose permissions"
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Create" type="submit" />
			</div>
		</form>
	);
};

export { GroupCreateForm };
