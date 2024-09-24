import { loadAll, loadAllUnread, markAsRead } from "./actions.js";
import { actions } from "./notification.slice.js";

const allActions = {
	...actions,
	loadAll,
	loadAllUnread,
	markAsRead,
};

export { allActions as actions };
export { reducer } from "./notification.slice.js";
