type ProjectGroupPatchResponseDto = {
	id: number;
	name: string;
	permissions: { id: number }[];
	projectId: { id: number };
	users: { id: number }[];
};

export { type ProjectGroupPatchResponseDto };
