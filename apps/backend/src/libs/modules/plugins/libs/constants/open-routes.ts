const openRoutes: Set<RegExp> = new Set([
	/^\/api\/[^/]+\/sign-up$/,
	/^\/api\/[^/]+\/sign-in$/,
]);

export { openRoutes };
