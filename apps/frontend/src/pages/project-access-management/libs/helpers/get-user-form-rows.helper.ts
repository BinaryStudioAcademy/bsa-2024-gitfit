import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";

import { type UserRow } from "../types/types.js";

const getUserFromRows = (
	users: UserRow[],
	groups: ProjectGroupGetAllItemResponseDto[],
): UserRow[] => {
	const userGroupsMap = new Map<number, string[]>();

	// console.log(users, groups);

	for (const group of groups) {
		for (const user of group.users) {
			const userGroups = userGroupsMap.get(user.id) || [];
			userGroups.push(group.name);
			userGroupsMap.set(user.id, userGroups);
		}
	}

	return users.map((user) => ({
		createdAt: user.createdAt,
		groups: (userGroupsMap.get(user.id) || []).join(", "),
		id: user.id,
		name: user.name,
	}));
};

export { getUserFromRows };
