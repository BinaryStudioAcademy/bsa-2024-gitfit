import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type UserRow } from "../types/types.js";

const getUserRows = (
	users: Omit<UserGetAllItemResponseDto, "email">[],
): UserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		id: user.id,
		name: user.name,
		projectGroups: user.groups.map((projectGroup) => projectGroup.name),
	}));

export { getUserRows };
