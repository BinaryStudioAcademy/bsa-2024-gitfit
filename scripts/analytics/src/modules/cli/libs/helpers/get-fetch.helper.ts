function getFetch(repoPath: string): string {
	return `git -C ${repoPath} fetch`;
}

export { getFetch };
