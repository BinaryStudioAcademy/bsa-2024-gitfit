import { type GITService } from "./libs/types/types.js";

class BaseGITService implements GITService {
	public getFetchCommand = (): string => {
		return "git fetch";
	};

	public getShortLogCommand = (): string => {
		return "git shortlog -sne --all --no-merges --group='%cs %cn <%ce>' --since='1 week ago'";
	};
}

export { BaseGITService };
