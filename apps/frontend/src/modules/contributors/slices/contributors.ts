import {
	loadAll,
	loadAllWithoutPagination,
	merge,
	patch,
	split,
} from "./actions.js";
import { actions } from "./contributor.slice.js";

const allActions = {
	...actions,
	loadAll,
	loadAllWithoutPagination,
	merge,
	patch,
	split,
};

export { allActions as actions };
export { reducer } from "./contributor.slice.js";
