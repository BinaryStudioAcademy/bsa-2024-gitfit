import { loadAll } from "./actions.js";
import { actions } from "./activity-log.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./activity-log.slice.js";
