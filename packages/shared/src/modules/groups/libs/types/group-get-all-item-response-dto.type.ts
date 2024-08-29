type GroupGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	name: string;
	permissions: { id: number }[];
	users: { id: number }[];
};

export { type GroupGetAllItemResponseDto };
