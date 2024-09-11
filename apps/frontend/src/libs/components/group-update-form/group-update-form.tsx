import { GroupCreateForm } from "~/libs/components/components.js";
import { useCallback, usePagination } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/libs/types/types.js";
import {
	type GroupGetAllItemResponseDto,
	type GroupUpdateRequestDto,
	groupUpdateValidationSchema,
} from "~/modules/groups/groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

type Properties = {
	allPermissions: PermissionGetAllItemResponseDto[];
	allUsers: Omit<UserGetAllItemResponseDto, "email">[];
	group: GroupGetAllItemResponseDto;
	onSubmit: (id: number, payload: GroupUpdateRequestDto) => void;
	usersTotalCount: number;
};

const GroupUpdateForm = ({
	allPermissions,
	allUsers,
	group,
	onSubmit,
	usersTotalCount,
}: Properties): JSX.Element => {
	const usersPagination = usePagination({
		queryParameterPrefix: "group-user",
		totalItemsCount: usersTotalCount,
	});

	const { id, name, permissions, users } = group;

	const permissionIds = permissions.map((permissions) => permissions.id);
	const userIds = users.map((user) => user.id);

	const handleFormSubmit = useCallback(
		(formData: GroupUpdateRequestDto): void => {
			onSubmit(id, formData);
		},
		[id, onSubmit],
	);

	return (
		<GroupCreateForm
			defaultValues={{
				name,
				permissionIds,
				userIds,
			}}
			onSubmit={handleFormSubmit}
			permissions={allPermissions}
			submitLabel="Update"
			users={allUsers}
			usersPagination={usersPagination}
			usersTotalCount={usersTotalCount}
			validationSchema={groupUpdateValidationSchema}
		/>
	);
};

export { GroupUpdateForm };
