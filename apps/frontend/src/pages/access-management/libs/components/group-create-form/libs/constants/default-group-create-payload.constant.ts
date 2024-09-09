import { type GroupCreateRequestDto } from "~/modules/groups/groups.js";

const DEFAULT_GROUP_CREATE_PAYLOAD: GroupCreateRequestDto = {
	name: "",
	permissionIds: [],
	userIds: [],
};

export { DEFAULT_GROUP_CREATE_PAYLOAD };
