import { copyToClipboard, create, deleteByProjectId } from "./actions.js";
import { actions } from "./project-api-keys.slice.js";

const allActions = {
	...actions,
	copyToClipboard,
	create,
	deleteByProjectId,
};

export { allActions as actions };
export { reducer } from "./project-api-keys.slice.js";
