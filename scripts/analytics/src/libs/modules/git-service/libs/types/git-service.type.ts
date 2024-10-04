type GITService = {
	getFetchCommand: () => string;
	getShortLogCommand: (since: string) => string;
};

export { type GITService };
