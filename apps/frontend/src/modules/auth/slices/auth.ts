import {
	getAuthenticatedUser,
	loadPermissions,
	logout,
	signIn,
	signUp,
} from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	loadPermissions,
	logout,
	signIn,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
