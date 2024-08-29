const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const apiUrlRegex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(apiUrlRegex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	return whiteRoutes.includes(route);
};

export { checkIsWhiteRoute };
