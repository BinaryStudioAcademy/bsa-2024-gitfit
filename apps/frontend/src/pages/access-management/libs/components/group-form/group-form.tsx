import { Button, Input, Loader, Select } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
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
import { type ValidationSchema } from "~/libs/types/types.js";
import {
	type GroupCreateRequestDto,
	type GroupUpdateRequestDto,
} from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";

import { GroupUsersTable } from "../group-users-table/group-users-table.js";
import { getPermissionOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type GroupRequest = GroupCreateRequestDto | GroupUpdateRequestDto;

type Properties<T extends GroupRequest> = {
	defaultValues: T;
	onSubmit: (payload: T) => void;
	submitLabel: string;
	validationSchema: ValidationSchema<T>;
};

const GroupForm = <T extends GroupRequest>({
	defaultValues,
	onSubmit,
	submitLabel,
	validationSchema,
}: Properties<T>): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleErrorsClear, handleSubmit, handleValueSet } =
		useAppForm<GroupRequest>({
			defaultValues,
			validationSchema,
		});

	const { dataStatus: permissionsDataStatus, permissions } = useAppSelector(
		({ permissions }) => permissions,
	);

	const { items: selectedUserIds, onToggle: handleUserIdsToggle } =
		useSelectedItems<number>(defaultValues.userIds);

	useEffect(() => {
		void dispatch(permissionActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		if (errors["userIds"] && selectedUserIds.length > EMPTY_LENGTH) {
			handleErrorsClear("userIds");
		}
	}, [selectedUserIds, errors, handleErrorsClear]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: GroupRequest) => {
				onSubmit(formData as T);
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
				<Button label={submitLabel} type="submit" />
			</div>
		</form>
	);
};

export { GroupForm };
