import { configureGroupUsers, loadAll, update } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	configureGroupUsers,
	loadAll,
	update,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
