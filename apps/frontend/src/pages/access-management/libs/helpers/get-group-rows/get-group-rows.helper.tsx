import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { type GroupRow } from "../../types/types.js";

const getGroupRows = (groups: GroupGetAllItemResponseDto[]): GroupRow[] =>
	groups.map((group) => ({
		createdAt: group.createdAt,
		id: group.id,
		name: group.name,
		permissions: group.permissions.map((permission) => permission.name),
		userCount: group.users.length,
	}));

export { getGroupRows };
