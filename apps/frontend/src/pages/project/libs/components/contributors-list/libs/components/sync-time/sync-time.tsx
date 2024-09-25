import { Icon, Tooltip } from "~/libs/components/components.js";
import { useEffect, useState } from "~/libs/hooks/hooks.js";

import { OVERDUE_LIMIT } from "./libs/constants/constants.js";
import { getSyncTime } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	analyticsLastSyncedAt: null | string;
	analyticsLastSyncedByUser: null | string;
};

const SyncTime = ({
	analyticsLastSyncedAt,
	analyticsLastSyncedByUser,
}: Properties): JSX.Element => {
	const [isOverdue, setIsOverdue] = useState<boolean>(false);
	const currentDate = new Date();

	const lastActivity = analyticsLastSyncedAt
		? new Date(analyticsLastSyncedAt)
		: null;

	const lastUpdateLabel = lastActivity
		? getSyncTime(lastActivity, currentDate)
		: null;

	useEffect(() => {
		if (lastUpdateLabel?.hoursDifference !== undefined) {
			setIsOverdue(lastUpdateLabel.hoursDifference >= OVERDUE_LIMIT);
		}
	}, [lastUpdateLabel]);

	const hasSyncTime = lastUpdateLabel && analyticsLastSyncedByUser;

	return (
		<Tooltip
			content={
				isOverdue
					? "Analytics have not been uploaded for over 5 hours. There may be an issue, and you might need to set it up again."
					: ""
			}
			id="lastUpdateTooltip"
		>
			{hasSyncTime && (
				<div
					className={
						styles[isOverdue ? "sync-time-overdue" : "sync-time-container"]
					}
				>
					<p>
						{lastUpdateLabel.label} • {analyticsLastSyncedByUser}
					</p>
					<Icon height={18} name="sync" width={18} />
				</div>
			)}
		</Tooltip>
	);
};

export { SyncTime };
