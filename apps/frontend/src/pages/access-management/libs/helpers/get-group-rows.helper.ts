import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { type GroupRow } from "../types/types.js";

const getGroupRows = (groups: GroupGetAllItemResponseDto[]): GroupRow[] =>
	groups.map((group) => ({
		createdAt: group.createdAt,
		name: group.name,
		permissions: group.permissions
			.map((permission) => permission.name)
			.join(", "),
	}));

export { getGroupRows };
