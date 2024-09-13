function getShortLogCmd(since: string): string {
	return `git shortlog -sne --all --no-merges --since="${since}"`;
}

export { getShortLogCmd };
