import { type User } from "../../types/types.js";
import { formatUserDate } from "../helpers.js";

const transformUserData = (users: User[]): User[] => {
	return users.map(({ createdAt, name }) => ({
		createdAt: formatUserDate(createdAt),
		name,
	}));
};

export { transformUserData };
