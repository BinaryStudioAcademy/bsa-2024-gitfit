import { copyToClipboard } from "./actions.js";
import { actions } from "./scripts.slice.js";

const allActions = {
	...actions,
	copyToClipboard,
};

export { allActions as actions };
export { reducer } from "./scripts.slice.js";
