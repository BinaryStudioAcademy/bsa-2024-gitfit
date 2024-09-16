import { type GITService } from "./libs/types/types.js";

class BaseGITService implements GITService {
	public getFetchCommand = (repoPath: string): string => {
		return `git -C ${repoPath} fetch`;
	};

	public getShortLogCommand = (since: string): string => {
		return `git shortlog -sne --all --no-merges --since="${since}"`;
	};
}

export { BaseGITService };
