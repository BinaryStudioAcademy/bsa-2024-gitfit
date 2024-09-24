import {
	ActivityLogsApiPath,
	APIPath,
	AuthAnalyticsApiPath,
	AuthApiPath,
} from "@git-fit/shared";

import { type WhiteRoute } from "~/libs/types/types.js";

const WHITE_ROUTES: WhiteRoute[] = [
	{ methods: ["POST"], path: `${APIPath.AUTH}${AuthApiPath.SIGN_UP}` },
	{ methods: ["POST"], path: `${APIPath.AUTH}${AuthApiPath.SIGN_IN}` },
	{
		methods: ["POST"],
		path: `${APIPath.ACTIVITY_LOGS}${ActivityLogsApiPath.ROOT}`,
	},
	{
		methods: ["POST"],
		path: `${APIPath.AUTH_ANALYTICS}${AuthAnalyticsApiPath.ROOT}`,
	},
];

export { WHITE_ROUTES };
