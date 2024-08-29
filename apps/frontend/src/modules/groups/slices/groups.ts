import { loadAll } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
