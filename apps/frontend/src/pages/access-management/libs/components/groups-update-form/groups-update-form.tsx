import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
	groupUpdateValidationSchema,
} from "~/modules/groups/groups.js";

type Properties = {
	group: GroupGetAllItemResponseDto;
	onSubmit: (id: number, payload: GroupUpdateRequestDto) => void;
};

const GroupsUpdateForm = ({ group, onSubmit }: Properties): JSX.Element => {
	const { id, name, permissions, users } = group;

	const permissionIds = permissions.map((permission) => permission.id);
	const userIds = users.map((user) => user.id);

	const { control, errors, handleSubmit } = useAppForm<GroupUpdateRequestDto>({
		defaultValues: { name, permissionIds, userIds },
		validationSchema: groupUpdateValidationSchema,
	});

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

			<div>
				<Button label="Update" type="submit" />
			</div>
		</form>
	);
};

export { GroupsUpdateForm };
