type GroupCreateRequestDto = {
	name: string;
	permissionIds?: number[] | undefined;
	userIds: number[];
};

export { type GroupCreateRequestDto };
