import { create, deleteById, loadAll, loadUsers, update } from "./actions.js";
import { actions } from "./group.slice.js";

const allActions = {
	...actions,
	create,
	deleteById,
	loadAll,
	loadUsers,
	update,
};

export { allActions as actions };
export { reducer } from "./group.slice.js";
