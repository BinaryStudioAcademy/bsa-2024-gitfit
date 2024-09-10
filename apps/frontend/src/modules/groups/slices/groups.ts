import { create, loadAll, loadUsers, update } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	create,
	loadAll,
	loadUsers,
	update,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
