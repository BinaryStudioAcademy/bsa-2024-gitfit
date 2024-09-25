type ContributorGetAllItemResponseDto = {
	gitEmails: {
		email: string;
		id: number;
	}[];
	hiddenAt: null | string;
	id: number;
	lastActivityDate: null | string;
	name: string;
	projects: {
		id: number;
		name: string;
	}[];
};

export { type ContributorGetAllItemResponseDto };
