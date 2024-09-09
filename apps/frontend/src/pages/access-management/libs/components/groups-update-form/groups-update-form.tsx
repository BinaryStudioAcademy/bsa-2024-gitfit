import { Button, Input, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { useAppDispatch, useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
	groupUpdateValidationSchema,
} from "~/modules/groups/groups.js";

import { GroupUsersTable } from "../components.js";

type Properties = {
	group: GroupGetAllItemResponseDto;
	onSubmit: (id: number, payload: GroupUpdateRequestDto) => void;
};

const GroupsUpdateForm = ({ group, onSubmit }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { id, name, permissions: groupPermissions, users: groupUsers } = group;

	const permissionIds = groupPermissions.map((permission) => permission.id);
	const userIds = groupUsers.map((user) => user.id);

	const { control, errors, handleSubmit } = useAppForm<GroupUpdateRequestDto>({
		defaultValues: { name, permissionIds, userIds },
		validationSchema: groupUpdateValidationSchema,
	});

	const { permissions } = dispatch(() => ({
		dataStatus: DataStatus.FULFILLED,
		permissions: [
			{
				id: 1,
				name: "permission 1",
			},
		],
	}));
	const permissionOptions = permissions.map((permission) => ({
		label: permission.name,
		value: permission.id,
	}));

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: GroupUpdateRequestDto) => {
				onSubmit(id, formData);
			})(event_);
		},
		[handleSubmit, id, onSubmit],
	);

	return (
		<form onSubmit={handleFormSubmit}>
			<Input
				autoComplete="name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>

			<GroupUsersTable<GroupUpdateRequestDto>
				control={control}
				name="userIds"
			/>

			<Select
				control={control}
				isMulti
				label="Permissions"
				name="permissionIds"
				options={permissionOptions}
			/>

			<div>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { GroupsUpdateForm };
