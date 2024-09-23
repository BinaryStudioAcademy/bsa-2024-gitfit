type ActivityLogGetAllItemAnalyticsResponseDto = {
	commitsNumber: (number | string)[];
	contributor: {
		id: string;
		isHidden: boolean;
		name: string;
	};
};

export { type ActivityLogGetAllItemAnalyticsResponseDto };
