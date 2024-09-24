import { type NotificationStatus } from "../enums/enums.js";

type NotificationStatusValue =
	(typeof NotificationStatus)[keyof typeof NotificationStatus];

export { type NotificationStatusValue };
