type GroupGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	name: string;
	permissions: { id: number; name: string }[];
	users: { id: number }[];
};

export { type GroupGetAllItemResponseDto };
