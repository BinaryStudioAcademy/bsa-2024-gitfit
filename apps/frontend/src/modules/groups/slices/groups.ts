import { configureGroupUsers, deleteById, loadAll, update } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	configureGroupUsers,
	deleteById,
	loadAll,
	update,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
