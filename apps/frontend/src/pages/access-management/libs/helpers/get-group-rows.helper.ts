import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { GroupMenu } from "../components/components.js";
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
		options: GroupMenu({
			onDelete: () => {
				options.onDelete(group);
			},
		}),
		permissions: group.permissions.map((permission) => permission.name),
	}));

export { getGroupRows };
