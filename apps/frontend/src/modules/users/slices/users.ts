import { loadAll, loadAllModal, updateProfile } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	loadAll,
	loadAllModal,
	updateProfile,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
