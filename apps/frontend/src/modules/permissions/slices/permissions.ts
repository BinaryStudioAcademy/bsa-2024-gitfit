import { loadAll } from "./actions.js";
import { actions } from "./permission.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./permission.slice.js";
