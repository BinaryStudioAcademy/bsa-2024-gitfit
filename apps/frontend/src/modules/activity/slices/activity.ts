import { loadAll, loadAllProjects } from "./actions.js";
import { actions } from "./activity.slice.js";

const allActions = {
	...actions,
	loadAll,
	loadAllProjects,
};

export { allActions as actions };
export { reducer } from "./activity.slice.js";
