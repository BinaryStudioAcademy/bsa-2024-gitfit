import { copyToClipboard, create } from "./actions.js";
import { actions } from "./project-api-keys.slice.js";

const allActions = {
	...actions,
	copyToClipboard,
	create,
};

export { allActions as actions };
export { reducer } from "./project-api-keys.slice.js";
