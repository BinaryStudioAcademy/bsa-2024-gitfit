import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

const getUsersFromProjectGroups = (
	projectGroups: ProjectGroupGetAllItemResponseDto[],
): UserGetAllItemResponseDto[] => {
	const userProjectGroupsMap: Record<number, UserGetAllItemResponseDto> = {};

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
