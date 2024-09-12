import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
	groupUpdateValidationSchema,
} from "~/modules/groups/groups.js";

import { GroupForm } from "../group-form/group-form.js";

type Properties = {
	group: GroupGetAllItemResponseDto;
	onSubmit: (id: number, payload: GroupUpdateRequestDto) => void;
};

const GroupUpdateForm = ({ group, onSubmit }: Properties): JSX.Element => {
	const { id, name, permissions, users } = group;

	const permissionIds = permissions.map((permission) => permission.id);
	const userIds = users.map((user) => user.id);

	const handleFormSubmit = useCallback(
		(formData: GroupUpdateRequestDto): void => {
			onSubmit(id, formData);
		},
		[id, onSubmit],
	);

	return (
		<GroupForm
			defaultValues={{
				name,
				permissionIds,
				userIds,
			}}
			onSubmit={handleFormSubmit}
			submitLabel="Update"
			validationSchema={groupUpdateValidationSchema}
		/>
	);
};

export { GroupUpdateForm };
