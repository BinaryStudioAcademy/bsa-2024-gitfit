import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

const getUsersFromProjectGroups = (
	groups: ProjectGroupGetAllItemResponseDto[],
): Omit<UserGetAllItemResponseDto, "email">[] => {
	const userGroupsMap: Record<
		number,
		Omit<UserGetAllItemResponseDto, "email">
	> = {};

	for (const group of groups) {
		for (const user of group.users) {
			const userGroups = userGroupsMap[user.id]?.groups ?? [];

			userGroupsMap[user.id] =
				(user.id,
				{
					...user,
					groups: [
						...userGroups,
						{
							id: group.id,
							name: group.name,
						},
					],
				});
		}
	}

	return Object.values(userGroupsMap);
};

export { getUsersFromProjectGroups };
