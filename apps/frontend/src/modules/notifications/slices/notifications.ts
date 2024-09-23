import { loadAll, markAsRead } from "./actions.js";
import { actions } from "./notification.slice.js";

const allActions = {
	...actions,
	loadAll,
	markAsRead,
};

export { allActions as actions };
export { reducer } from "./notification.slice.js";
