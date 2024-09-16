type ActivityLogCreateItemRequestDto = {
	date: string;
	items: {
		authorEmail: string;
		authorName: string;
		commitsNumber: number;
	}[];
};

export { type ActivityLogCreateItemRequestDto };
