import { loadAll, update } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	loadAll,
	update,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
