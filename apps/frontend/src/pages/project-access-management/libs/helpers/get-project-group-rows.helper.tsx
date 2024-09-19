import { type ProjectGroupGetAllItemResponseDto } from "@git-fit/shared";

import { type ProjectGroupRow } from "../types/types.js";

const getProjectGroupRows = (
	projectGroups: ProjectGroupGetAllItemResponseDto[],
): ProjectGroupRow[] =>
	projectGroups.map((projectGroup) => ({
		createdAt: projectGroup.createdAt,
		id: projectGroup.id,
		name: projectGroup.name,
		permissions: projectGroup.permissions.map((permission) => permission.name),
		userCount: projectGroup.users.length,
	}));

export { getProjectGroupRows };
