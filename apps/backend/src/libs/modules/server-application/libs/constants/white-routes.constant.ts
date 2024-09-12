import { ActivityLogsApiPath, APIPath, AuthApiPath } from "@git-fit/shared";

import { type WhiteRoute } from "~/libs/types/types.js";

const WHITE_ROUTES: WhiteRoute[] = [
	{ methods: ["GET", "POST"], path: `${APIPath.AUTH}${AuthApiPath.SIGN_UP}` },
	{ methods: ["GET", "POST"], path: `${APIPath.AUTH}${AuthApiPath.SIGN_IN}` },
	{
		methods: ["POST"],
		path: `${APIPath.ACTIVITY_LOGS}${ActivityLogsApiPath.ROOT}`,
	},
];

export { WHITE_ROUTES };
