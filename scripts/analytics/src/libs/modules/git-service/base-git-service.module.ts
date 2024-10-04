import { type GITService } from "./libs/types/types.js";

class BaseGITService implements GITService {
	public getFetchCommand = (): string => {
		return "git fetch";
	};

	public getShortLogCommand = (since: string): string => {
		return `git shortlog -sne --all --no-merges --since="${since}"`;
	};
}

export { BaseGITService };
