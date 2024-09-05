import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { GroupOptions } from "../components/components.js";
import {
	type GroupRow,
	type GroupOptions as TGroupOptions,
} from "../types/types.js";

const getGroupRows = (
	groups: GroupGetAllItemResponseDto[],
	options: TGroupOptions,
): GroupRow[] =>
	groups.map((group) => ({
		createdAt: group.createdAt,
		id: group.id,
		name: group.name,
		options: <GroupOptions group={group} onEdit={options.onEdit} />,
		permissions: group.permissions.map((permission) => permission.name),
	}));

export { getGroupRows };
