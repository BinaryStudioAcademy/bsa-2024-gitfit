import { getAuthenticatedUser, logout, signIn, signUp } from "./actions.js";
import { actions } from "./auth.slice.js";

const allActions = {
	...actions,
	getAuthenticatedUser,
	logout,
	signIn,
	signUp,
};

export { allActions as actions };
export { reducer } from "./auth.slice.js";
