import { type ProjectGroupGetAllItemResponseDto } from "~/modules/project-groups/project-groups.js";

import { type UserRow } from "../types/types.js";

const getUserRows = (
	groups: ProjectGroupGetAllItemResponseDto[],
): UserRow[] => {
	const userGroupsMap = new Map<
		number,
		{ createdAt: string; groups: string[]; id: number; name: string }
	>();

	for (const group of groups) {
		for (const user of group.users) {
			if (userGroupsMap.has(user.id)) {
				userGroupsMap.get(user.id)?.groups.push(group.name);
			} else {
				userGroupsMap.set(user.id, {
					createdAt: group.createdAt,
					groups: [group.name],
					id: user.id,
					name: user.name,
				});
			}
		}
	}

	return [...userGroupsMap.values()].map((user) => ({
		createdAt: user.createdAt,
		groups: user.groups.join(", "),
		id: user.id,
		name: user.name,
	}));
};

export { getUserRows };
