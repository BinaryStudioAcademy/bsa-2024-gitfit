import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

const getUsersFromProjectGroups = (
	projectGroups: ProjectGroupGetAllItemResponseDto[],
): Omit<UserGetAllItemResponseDto, "email">[] => {
	const userProjectGroupsMap: Record<
		number,
		Omit<UserGetAllItemResponseDto, "email">
	> = {};

	for (const projectGroup of projectGroups) {
		for (const user of projectGroup.users) {
			const userGroups = userProjectGroupsMap[user.id]?.groups ?? [];

			userProjectGroupsMap[user.id] = {
				...user,
				groups: [
					...userGroups,
					{
						id: projectGroup.id,
						name: projectGroup.name,
					},
				],
			};
		}
	}

	return Object.values(userProjectGroupsMap);
};

export { getUsersFromProjectGroups };
