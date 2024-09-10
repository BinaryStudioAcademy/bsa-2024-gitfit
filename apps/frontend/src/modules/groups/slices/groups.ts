import { create, loadAll, loadUsers } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	create,
	loadAll,
	loadUsers,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
