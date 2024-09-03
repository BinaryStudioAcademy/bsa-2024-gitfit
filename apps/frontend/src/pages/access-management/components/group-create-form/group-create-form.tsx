import { Button, Input, Select, Table } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type SelectOption, type TableColumn } from "~/libs/types/types.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";

import { type UserRow } from "../../libs/types/types.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: GroupCreateRequestDto) => void;
	users: {
		userColumns: TableColumn<UserRow>[];
		userData: UserRow[];
	};
};

const GroupCreateForm = ({ onSubmit, users }: Properties): JSX.Element => {
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
						.map((selectedId) => users.userData[selectedId]?.id)
						.filter((id) => id !== undefined),
				});
			})(event_);
		},
		[handleSubmit, onSubmit, selectedPermissionIds, users.userData],
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
			<h2 className={styles["section-title"]}>Users</h2>
			<Table<UserRow>
				columns={users.userColumns}
				data={users.userData}
				onRowSelect={handleUserSelect}
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
