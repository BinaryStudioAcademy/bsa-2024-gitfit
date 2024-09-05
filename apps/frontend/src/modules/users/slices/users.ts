import { configureGroupUsers, loadAll, updateProfile } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	configureGroupUsers,
	loadAll,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
