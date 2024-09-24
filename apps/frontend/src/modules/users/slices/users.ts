import {
	deleteById,
	deleteCurrentUser,
	loadAll,
	updateCurrentUserProfile,
} from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	deleteById,
	deleteCurrentUser,
	loadAll,
	updateCurrentUserProfile,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
