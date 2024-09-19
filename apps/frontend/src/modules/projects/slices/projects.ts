import {
	create,
	deleteById,
	getById,
	loadAll,
	loadAllContributorsByProjectId,
	patch,
} from "./actions.js";
import { actions } from "./project.slice.js";

const allActions = {
	...actions,
	create,
	deleteById,
	getById,
	loadAll,
	loadAllContributorsByProjectId,
	patch,
};

export { allActions as actions };
export { reducer } from "./project.slice.js";
