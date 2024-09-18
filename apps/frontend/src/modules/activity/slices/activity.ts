import { loadAll } from "./actions.js";
import { actions } from "./activity.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./activity.slice.js";
