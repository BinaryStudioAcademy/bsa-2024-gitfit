type ProjectGroupCreateResponseDto = {
	createdAt: string;
	id: number;
	name: string;
	permissions: { id: number; name: string }[];
	projectId: { id: number };
	users: { createdAt: string; email: string; id: number; name: string }[];
};

export { type ProjectGroupCreateResponseDto };
