import { type GITService } from "./libs/types/types.js";

class BaseGITService implements GITService {
	public getFetchCommand = (repoPath: string): string => {
		return `git -C ${repoPath} fetch`;
	};

	public getShortLogCommand = (repoPath: string, since: string): string => {
		return `git -C ${repoPath} shortlog -sne --all --no-merges --since="${since}"`;
	};
}

export { BaseGITService };
