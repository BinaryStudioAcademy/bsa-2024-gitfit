import { Loader, Popover } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { formatRelativeTime } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useInfiniteScroll,
	useIntersectionObserver,
} from "~/libs/hooks/hooks.js";
import { actions as notificationActions } from "~/modules/notifications/notifications.js";

import { NotificationItem } from "./libs/components/components.js";
import { NOTIFICATIONS_PAGE_SIZE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
};

const NotificationsPopover = ({
	children,
	isOpened,
	onClose,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();
	const { dataStatus, notifications, notificationsTotalCount } = useAppSelector(
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
		pageSize: NOTIFICATIONS_PAGE_SIZE,
		totalItemsCount: notificationsTotalCount,
	});

	const { reference: sentinelReference } =
		useIntersectionObserver<HTMLDivElement>({
			isDisabled: !hasNextPage || dataStatus === DataStatus.PENDING,
			onIntersect: onNextPage,
		});

	useEffect(() => {
		if (isOpened) {
			onPageReset();
		}
	}, [isOpened, onPageReset]);

	const hasNotifications = notifications.length !== EMPTY_LENGTH;
	const isLoadingMore = dataStatus === DataStatus.PENDING;
	const isPlaceholderShown = !hasNotifications && !isLoadingMore;

	return (
		<Popover
			content={
				<div className={styles["notifications-popover"]}>
					<h3 className={styles["notifications-title"]}>Notifications</h3>
					<div className={styles["notifications"]}>
						{hasNotifications &&
							notifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									message={notification.payload}
									status={notification.status}
									timestamp={formatRelativeTime(notification.createdAt)}
								/>
							))}

						{isPlaceholderShown && (
							<p className={styles["empty-placeholder"]}>
								There is nothing yet.
							</p>
						)}

						<div className={styles["sentinel"]} ref={sentinelReference} />

						{isLoadingMore && <Loader />}
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
