type GITService = {
	getFetchCommand: (repoPath: string) => string;
	getShortLogCommand: (since: string) => string;
};

export { type GITService };
