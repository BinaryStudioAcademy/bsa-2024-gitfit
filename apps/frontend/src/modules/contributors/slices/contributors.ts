import { loadAll } from "./actions.js";
import { actions } from "./contributor.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./contributor.slice.js";
