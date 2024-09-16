type GITService = {
	getFetchCommand: (repoPath: string) => string;
	getShortLogCommand: (repoPath: string, since: string) => string;
};

export { type GITService };
