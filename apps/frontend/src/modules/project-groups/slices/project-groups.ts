import {
	create,
	deleteById,
	loadAllByProjectId,
	loadUsers,
	patch,
} from "./actions.js";
import { actions } from "./project-group.slice.js";

const allActions = {
	...actions,
	create,
	deleteById,
	loadAllByProjectId,
	loadUsers,
	patch,
};

export { allActions as actions };
export { reducer } from "./project-group.slice.js";
