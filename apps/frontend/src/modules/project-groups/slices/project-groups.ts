import {
	create,
	deleteById,
	loadAllByProjectId,
	loadUsers,
} from "./actions.js";
import { actions } from "./project-group.slice.js";

const allActions = {
	...actions,
	create,
	deleteById,
	loadAllByProjectId,
	loadUsers,
};

export { allActions as actions };
export { reducer } from "./project-group.slice.js";
