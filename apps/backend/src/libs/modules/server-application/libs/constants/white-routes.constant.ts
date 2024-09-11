import { ActivityLogsApiPath, APIPath, AuthApiPath } from "@git-fit/shared";

const WHITE_ROUTES = [
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	`${APIPath.ACTIVITY_LOGS}${ActivityLogsApiPath.SAVE}`,
];

export { WHITE_ROUTES };
