import { type ProjectGroupGetAllItemResponseDto } from "@git-fit/shared";

import { type GroupRow } from "../types/types.js";

const getGroupRows = (
	groups: ProjectGroupGetAllItemResponseDto[],
): GroupRow[] =>
	groups.map((group) => ({
		createdAt: group.createdAt,
		name: group.name,
		permissions: group.permissions.map((permission) => permission.name),
	}));

export { getGroupRows };
