import { type ProjectGroupCreateRequestDto } from "~/modules/project-groups/project-groups.js";

const DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD: ProjectGroupCreateRequestDto = {
	name: "",
	permissionIds: [],
	projectId: 0,
	userIds: [],
};

export { DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD };
