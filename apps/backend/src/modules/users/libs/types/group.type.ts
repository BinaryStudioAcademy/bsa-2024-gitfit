import { type Permission } from "./permission.type.js";

type Group = {
	groupName: string;
	permissions: Permission[];
};

export { type Group };
