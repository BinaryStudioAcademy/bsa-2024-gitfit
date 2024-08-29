import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type UserRow } from "../types/types.js";

const getUserRows = (users: UserAuthResponseDto[]): UserRow[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		name: user.name,
	}));

export { getUserRows };
