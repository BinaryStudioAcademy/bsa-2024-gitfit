type UserAuthResponseDto = {
	createdAt: string;
	email: string;
	groups: {
		groupName: string;
		permissions: {
			key: string;
			name: string;
		}[];
	}[];
	id: number;
	name: string;
};

export { type UserAuthResponseDto };
