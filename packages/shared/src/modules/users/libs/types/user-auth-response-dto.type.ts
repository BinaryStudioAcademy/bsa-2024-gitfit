type UserAuthResponseDto = {
	createdAt: string;
	email: string;
	groups: {
		id: number;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
	}[];
	id: number;
	name: string;
	projectGroups: {
		id: number;
		name: string;
		permissions: {
			id: number;
			key: string;
			name: string;
		}[];
		projectId: number;
	}[];
};

export { type UserAuthResponseDto };
