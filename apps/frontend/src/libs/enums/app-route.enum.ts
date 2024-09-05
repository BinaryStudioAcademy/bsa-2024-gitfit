const AppRoute = {
	ACCESS_MANAGEMENT: "/access-management",
	ANALYTICS: "/analitycs",
	ANY: "*",
	PROFILE: "/profile",
	PROJECT: "/projects/:id",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UI: "/ui",
} as const;

export { AppRoute };
