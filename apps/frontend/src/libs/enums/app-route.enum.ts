const AppRoute = {
	ACCESS_MANAGEMENT: "/access-management",
	ANY: "*",
	PROFILE: "/profile",
	PROJECT: "/projects/:id",
	PROJECTS: "/projects",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UI: "/ui",
} as const;

export { AppRoute };
