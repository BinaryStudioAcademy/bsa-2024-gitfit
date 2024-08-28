import { getById } from "./actions.js";
import { actions } from "./project.slice.js";

const allActions = {
	...actions,
	getById,
};

export { allActions as actions };
export { reducer } from "./project.slice.js";
