type ActivityLogCreateItemResponseDto = {
	date: string;
	logItem: {
		authorEmail: string;
		authorName: string;
		commitsNumber: number;
	};
	projectId: number;
	userId: number;
};

export { type ActivityLogCreateItemResponseDto };
