import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type GroupUserRow } from "../types/types.js";

const getGroupUserRows = (users: UserAuthResponseDto[]): GroupUserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		groups: [], // add groups to UserAuthResponseDto (#79)
		id: user.id,
		name: user.name,
	}));

export { getGroupUserRows };
