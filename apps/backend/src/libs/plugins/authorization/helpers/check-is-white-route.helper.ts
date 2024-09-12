import { type WhiteRoute } from "~/libs/types/types.js";

const checkIsWhiteRoute = (
	url: string,
	method: string,
	whiteRoutes: WhiteRoute[],
): boolean => {
	const apiUrlRegex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(apiUrlRegex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	return whiteRoutes.some(
		({ methods, path }) => path === route && methods.includes(method),
	);
};

export { checkIsWhiteRoute };
