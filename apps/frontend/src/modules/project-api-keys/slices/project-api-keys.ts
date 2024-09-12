import { copy, create } from "./actions.js";
import { actions } from "./project-api-keys.slice.js";

const allActions = {
	...actions,
	copy,
	create,
};

export { allActions as actions };
export { reducer } from "./project-api-keys.slice.js";
