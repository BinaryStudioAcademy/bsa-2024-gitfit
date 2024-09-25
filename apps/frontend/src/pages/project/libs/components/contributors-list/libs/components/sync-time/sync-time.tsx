import { Icon, Tooltip } from "~/libs/components/components.js";
import { useEffect, useState } from "~/libs/hooks/hooks.js";

import { OVERDUE_LIMIT } from "./libs/constants/constants.js";
import { getStartOfDay, getSyncTime } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	lastActivityDate: null | string;
	lastActivityUserName: null | string;
};

const SyncTime = ({
	lastActivityDate,
	lastActivityUserName,
}: Properties): JSX.Element => {
	const [isOverdue, setIsOverdue] = useState<boolean>(false);
	const currentDate = getStartOfDay(new Date());

	const lastActivity = lastActivityDate
		? getStartOfDay(new Date(lastActivityDate))
		: null;

	const lastUpdateLabel = lastActivity
		? getSyncTime(lastActivity, currentDate)
		: null;

	useEffect(() => {
		if (lastUpdateLabel && lastUpdateLabel.hoursDifference !== undefined) {
			setIsOverdue(lastUpdateLabel.hoursDifference >= OVERDUE_LIMIT);
		}
	}, [lastUpdateLabel]);

	return (
		<Tooltip
			content={
				isOverdue
					? "Analytics have not been uploaded for over 5 hours. There may be an issue, and you might need to set it up again."
					: ""
			}
			id="lastUpdateTooltip"
		>
			<div className={styles["sync-time-container"]}>
				<p
					className={
						isOverdue ? styles["sync-time-overdue"] : styles["sync-time"]
					}
				>
					{lastUpdateLabel?.label} • {lastActivityUserName}
				</p>
				{isOverdue ? (
					<Icon height={18} name="syncOverdue" width={18} />
				) : (
					<Icon height={18} name="sync" width={18} />
				)}
			</div>
		</Tooltip>
	);
};

export { SyncTime };
