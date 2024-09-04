import { create, getById, loadAll, patch } from "./actions.js";
import { actions } from "./project.slice.js";

const allActions = {
	...actions,
	create,
	getById,
	loadAll,
	patch,
};

export { allActions as actions };
export { reducer } from "./project.slice.js";
