import { loadPermissions } from "./actions.js";
import { actions } from "./permission.slice.js";

const allActions = {
	...actions,
	loadPermissions,
};

export { allActions as actions };
export { reducer } from "./permission.slice.js";
