import { Button, Input, Loader, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useSelectedItems,
} from "~/libs/hooks/hooks.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";

import { GroupUsersTable } from "../group-users-table/group-users-table.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import { getPermissionOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: GroupCreateRequestDto) => void;
};

const GroupCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { control, errors, handleSubmit, handleValueSet } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues: DEFAULT_GROUP_CREATE_PAYLOAD,
			validationSchema: groupCreateValidationSchema,
		});

	const { dataStatus: permissionsDataStatus, permissions } = useAppSelector(
		({ permissions }) => permissions,
	);

	useEffect(() => {
		void dispatch(permissionActions.loadAll());
	}, [dispatch]);

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

	const permissionOptions = useMemo(
		() => getPermissionOptions(permissions),
		[permissions],
	);

	const isLoading =
		permissionsDataStatus === DataStatus.IDLE ||
		permissionsDataStatus === DataStatus.PENDING;

	const { items: selectedUserIds, onToggle: handleUserIdsToggle } =
		useSelectedItems<number>([]);

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
			<GroupUsersTable
				errors={errors}
				onToggle={handleUserIdsToggle}
				selectedUserIds={selectedUserIds}
				setValue={handleValueSet}
			/>
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
