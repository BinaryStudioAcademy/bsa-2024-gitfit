type ContributorGetAllItemResponseDto = {
	gitEmails: {
		email: string;
		id: number;
	}[];
	id: number;
	isHidden: boolean;
	lastActivityDate: null | string;
	name: string;
	projects: {
		id: number;
		name: string;
	}[];
};

export { type ContributorGetAllItemResponseDto };
