import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

const filterUserProjectGroups = (
	users: UserGetAllItemResponseDto[],
	projectGroups: ProjectGroupGetAllItemResponseDto[],
): UserGetAllItemResponseDto[] =>
	users.map((user) => {
		const userProjectGroups = new Set(user.projectGroups.map(({ id }) => id));
		const filteredUserProjectGroups = projectGroups.filter(({ id }) =>
			userProjectGroups.has(id),
		);

		return {
			...user,
			projectGroups: filteredUserProjectGroups,
		};
	});

export { filterUserProjectGroups };
