type UserAuthResponseDto = {
	createdAt: string;
	email: string;
	groups: {
		id: number;
		name: string;
	}[];
	id: number;
	name: string;
};

export { type UserAuthResponseDto };
