const AppRoute = {
	ANY: "*",
	PROJECT: "/projects/:id",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AppRoute };
