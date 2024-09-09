import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type GroupUserRow } from "../types/types.js";

const getGroupUserRows = (users: UserGetAllItemResponseDto[]): GroupUserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		groups: [], // add groups to UserAuthResponseDto (#79)
		id: user.id,
		name: user.name,
	}));

export { getGroupUserRows };
