import { Loader, Popover } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { formatRelativeTime } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useInfiniteScroll,
} from "~/libs/hooks/hooks.js";
import { actions as notificationActions } from "~/modules/notifications/notifications.js";

import { NotificationItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
};

const PAGE_SIZE = 10;

const NotificationsPopover = ({
	children,
	isOpened,
	onClose,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { notifications, notificationsTotalCount } = useAppSelector(
		({ notifications }) => notifications,
	);

	const handleLoadNotifications = useCallback(
		(page: number, pageSize: number) => {
			void dispatch(notificationActions.loadAll({ page, pageSize }));
		},
		[dispatch],
	);

	const { hasNextPage, onNextPage, onPageReset } = useInfiniteScroll({
		currentItemsCount: notifications.length,
		onLoading: handleLoadNotifications,
		pageSize: PAGE_SIZE,
		totalItemsCount: notificationsTotalCount,
	});

	useEffect(() => {
		if (isOpened) {
			onPageReset();
		}
	}, [isOpened, onPageReset]);

	const hasNotifications = notifications.length !== EMPTY_LENGTH;
	const isLoading = hasNextPage;

	return (
		<Popover
			content={
				<div className={styles["notifications-popover"]}>
					<h3 className={styles["notifications-title"]}>Notifications</h3>
					<div className={styles["notifications"]}>
						{hasNotifications ? (
							notifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									message={notification.payload}
									timestamp={formatRelativeTime(notification.createdAt)}
								/>
							))
						) : (
							<p className={styles["empty-placeholder"]}>
								There is nothing yet.
							</p>
						)}
						{isLoading && <Loader />}
						{hasNextPage && (
							<button
								className={styles["load-more-button"]}
								onClick={onNextPage}
							>
								Load More
							</button>
						)}
					</div>
				</div>
			}
			isOpened={isOpened}
			onClose={onClose}
		>
			{children}
		</Popover>
	);
};

export { NotificationsPopover };
