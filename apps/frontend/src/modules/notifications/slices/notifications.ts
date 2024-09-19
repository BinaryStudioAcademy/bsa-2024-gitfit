import { loadAll } from "./actions.js";
import { actions } from "./notification.slice.js";

const allActions = {
	...actions,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./notification.slice.js";
