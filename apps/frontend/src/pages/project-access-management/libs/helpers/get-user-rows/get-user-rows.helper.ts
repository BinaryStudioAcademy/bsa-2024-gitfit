import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type UserRow } from "../../types/types.js";

const getUserRows = (users: UserGetAllItemResponseDto[]): UserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		id: user.id,
		name: user.name,
		projectGroups: user.projectGroups.map((projectGroup) => projectGroup.name),
	}));

export { getUserRows };
