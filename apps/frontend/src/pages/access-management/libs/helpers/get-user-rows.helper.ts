import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type UserRow } from "../types/types.js";

const getUserRows = (users: UserGetAllItemResponseDto[]): UserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		name: user.name,
	}));

export { getUserRows };
