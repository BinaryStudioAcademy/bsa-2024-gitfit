import { Button, Input, Select } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserRows } from "../../libs/helpers/helpers.js";
import { type UserRow } from "../../libs/types/types.js";
import { UsersTable } from "../users-table/users-table.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	onRowSelect?: (rowId: number, isSelected: boolean) => void;
	onSubmit: (payload: GroupCreateRequestDto) => void;
	page: number;
	pageSize: number;
	totalItemsCount: number;
	users: UserGetAllItemResponseDto[];
};

const GroupCreateForm = ({
	onPageChange,
	onPageSizeChange,
	onSubmit,
	page,
	pageSize,
	totalItemsCount,
	users,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, setValue } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues: DEFAULT_GROUP_CREATE_PAYLOAD,
			validationSchema: groupCreateValidationSchema,
		});

	const [, setSelectedUserIds] = useState<number[]>([]);
	const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(
		[],
	);
	const { permissions } = useAppSelector(({ permissions }) => permissions);

	useEffect(() => {
		void dispatch(permissionActions.loadAll());
	}, [dispatch]);

	const userData: UserRow[] = getUserRows(users);

	const handleUserSelect = useCallback(
		(userId: number, isSelected: boolean) => {
			setSelectedUserIds((previousIds) => {
				const updatedIds = isSelected
					? [...previousIds, userId]
					: previousIds.filter((id) => id !== userId);
				setValue("userIds", updatedIds);

				return updatedIds;
			});
		},
		[setValue],
	);

	const handlePermissionsChange = useCallback(
		(selectedOptions: SelectOption<number>[]) => {
			const selectedIds = selectedOptions.map((option) => option.value);
			setSelectedPermissionIds(selectedIds);
			setValue("permissionIds", selectedIds);
		},
		[setValue],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: GroupCreateRequestDto) => {
				onSubmit({
					name: formData.name,
					permissionIds: selectedPermissionIds,
					userIds: formData.userIds
						.map((selectedId) => userData[selectedId]?.id)
						.filter((id) => id !== undefined),
				});
			})(event_);
		},
		[handleSubmit, onSubmit, selectedPermissionIds, userData],
	);

	const permissionOptions = permissions.map((permission) => ({
		label: permission.name,
		value: permission.id,
	}));

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
				totalItemsCount={totalItemsCount}
				users={users}
			/>
			<Select
				control={control}
				isMulti
				label="Permissions"
				name="permissionIds"
				onChange={handlePermissionsChange}
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
