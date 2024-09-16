type ActivityLogGetAllItemResponseDto = {
	commitsNumber: number;
	createdByUser: { id: number };
	date: string;
	gitEmail: {
		contributor: {
			id: number;
			name: string;
		};
		id: number;
	};
	id: number;
	project: { id: number };
};

export { type ActivityLogGetAllItemResponseDto };
