import { type TableUser } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const getUserRows = (users: UserAuthResponseDto[]): TableUser[] =>
	users.map((user) => ({
		createdAt: user.createdAt,
		name: user.name,
	}));

export { getUserRows };
