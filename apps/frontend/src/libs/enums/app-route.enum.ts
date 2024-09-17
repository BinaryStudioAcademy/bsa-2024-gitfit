const AppRoute = {
	ACCESS_MANAGEMENT: "/access-management",
	ANALYTICS: "/analytics",
	ANY: "*",
	CONTRIBUTORS: "/contributors",
	NO_ACCESS: "/no-access",
	PROFILE: "/profile",
	PROJECT: "/projects/:id",
	PROJECT_ACCESS_MANAGEMENT: "/projects/:id/access-management",
	PROJECTS: "/projects",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UI: "/ui",
} as const;

export { AppRoute };
