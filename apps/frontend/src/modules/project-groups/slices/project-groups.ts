import { create, loadAllByProjectId } from "./actions.js";
import { actions } from "./project-group.slice.js";

const allActions = {
	...actions,
	create,
	loadAllByProjectId,
};

export { allActions as actions };
export { reducer } from "./project-group.slice.js";
