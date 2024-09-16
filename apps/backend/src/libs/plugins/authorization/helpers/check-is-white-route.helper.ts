import { type HTTPMethod, type WhiteRoute } from "~/libs/types/types.js";

type WhiteRouteOptions = {
	method: HTTPMethod;
	url: string;
	whiteRoutes: WhiteRoute[];
};

const checkIsWhiteRoute = ({
	method,
	url,
	whiteRoutes,
}: WhiteRouteOptions): boolean => {
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
