import { type DefaultValues } from "react-hook-form";

import { Button, Input, Loader, Select } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useMemo,
	type UsePaginationValues,
	useSelectedItems,
} from "~/libs/hooks/hooks.js";
import { type ValidationSchema } from "~/libs/types/types.js";
import { type GroupCreateRequestDto } from "~/modules/groups/groups.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { GroupUsersTable } from "../group-users-table/group-users-table.js";
import { getPermissionOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties<T extends GroupCreateRequestDto> = {
	defaultValues: DefaultValues<T>;
	isLoading?: boolean;
	onSubmit: (payload: T) => void;
	permissions: PermissionGetAllItemResponseDto[];
	users: Omit<UserGetAllItemResponseDto, "email">[];
	usersPagination: UsePaginationValues;
	usersTotalCount: number;
	validationSchema: ValidationSchema<T>;
};

const GroupCreateForm = <T extends GroupCreateRequestDto>({
	defaultValues,
	isLoading,
	onSubmit,
	permissions,
	users,
	usersPagination,
	usersTotalCount,
	validationSchema,
}: Properties<T>): JSX.Element => {
	const { control, errors, handleErrorsClear, handleSubmit, handleValueSet } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues,
			validationSchema,
		});

	const { items: selectedUserIds, onToggle: handleUserIdsToggle } =
		useSelectedItems<number>([]);

	useEffect(() => {
		if (errors["userIds"] && selectedUserIds.length > EMPTY_LENGTH) {
			handleErrorsClear("userIds");
		}
	}, [selectedUserIds, errors, handleErrorsClear]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				onSubmit(formData as T);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const permissionOptions = useMemo(
		() => getPermissionOptions(permissions),
		[permissions],
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
			<GroupUsersTable
				errors={errors}
				onToggle={handleUserIdsToggle}
				pagination={usersPagination}
				selectedUserIds={selectedUserIds}
				setValue={handleValueSet}
				users={users}
				usersTotalCount={usersTotalCount}
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
