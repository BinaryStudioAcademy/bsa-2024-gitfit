type GroupCreateResponseDto = {
	id: number;
	name: string;
	permissions: { id: number }[];
	users: { id: number }[];
};

export { type GroupCreateResponseDto };
