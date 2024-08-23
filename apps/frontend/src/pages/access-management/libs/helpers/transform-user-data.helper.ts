import { formatDate } from "~/libs/helpers/helpers.js";

import { type User } from "../types/types.js";

const transformUserData = (users: User[]): User[] => {
	return users.map(({ createdAt, name }) => ({
		createdAt: formatDate(createdAt),
		name,
	}));
};

export { transformUserData };
