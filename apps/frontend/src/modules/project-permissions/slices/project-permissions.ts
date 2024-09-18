import { loadAll } from "./actions.js";
import { actions } from "./project-permissions.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./project-permissions.slice.js";
