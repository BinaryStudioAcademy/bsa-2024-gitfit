import { loadAll, merge, patch } from "./actions.js";
import { actions } from "./contributor.slice.js";

const allActions = {
	...actions,
	loadAll,
	merge,
	patch,
};

export { allActions as actions };
export { reducer } from "./contributor.slice.js";
