type ActivityLogCreateItemResponseDto = {
	commitsNumber: number;
	contributor: {
		id: number;
		name: string;
	};
	createdByUser: { id: number };
	date: string;
	gitEmail: { id: number };
	id: number;
	project: { id: number };
};

export { type ActivityLogCreateItemResponseDto };
