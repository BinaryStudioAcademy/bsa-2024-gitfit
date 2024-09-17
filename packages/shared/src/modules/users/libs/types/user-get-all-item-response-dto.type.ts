type UserGetAllItemResponseDto = {
	createdAt: string;
	email: string;
	groups: {
		id: number;
		name: string;
	}[];
	id: number;
	name: string;
	projectGroups: {
		id: number;
		name: string;
	}[];
};

export { type UserGetAllItemResponseDto };
