type ContributorGetAllItemResponseDto = {
	gitEmails: {
		email: string;
		id: number;
	}[];
	id: number;
	name: string;
	projects: {
		id: number;
		name: string;
	}[];
};

export { type ContributorGetAllItemResponseDto };
