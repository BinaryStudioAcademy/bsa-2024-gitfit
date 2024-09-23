type ActivityLogGetAllItemAnalyticsResponseDto = {
	commitsNumber: number[];
	contributor: {
		id: string;
		isHidden: boolean;
		name: string;
	};
};

export { type ActivityLogGetAllItemAnalyticsResponseDto };
