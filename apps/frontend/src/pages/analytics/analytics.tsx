import { DateInput, Loader, PageLayout } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as activityLogActions } from "~/modules/activity-logs/activity-logs.js";

import { AnalyticsTable } from "./libs/components/components.js";
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const todayDate = new Date();

	const initialDateRange: [Date, Date] = [
		subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE),
		todayDate,
	];

	const { activityLogs, dataStatus } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);

	const [dateRange, setDateRange] = useState<[Date, Date]>(initialDateRange);

	const { control, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: initialDateRange,
		},
	});

	const handleLoadActivityLogs = useCallback(() => {
		void dispatch(activityLogActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		handleLoadActivityLogs();
	}, [handleLoadActivityLogs]);

	const handlePopoverClose = useCallback(
		(selectedDateRange: [Date, Date]): void => {
			setDateRange(selectedDateRange);
		},
		[setDateRange],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				setDateRange(formData.dateRange);
			})(event_);
		},
		[handleSubmit],
	);

	const hasActivityLog = activityLogs.length !== EMPTY_LENGTH;

	const isLoading =
		dataStatus === DataStatus.IDLE ||
		(dataStatus === DataStatus.PENDING && !hasActivityLog);

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section>
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<DateInput
						control={control}
						maxDate={todayDate}
						maxRange={ANALYTICS_DATE_MAX_RANGE}
						name="dateRange"
						onPopoverClose={handlePopoverClose}
					/>
				</form>
				{isLoading ? (
					<Loader />
				) : (
					<AnalyticsTable activityLogs={activityLogs} dateRange={dateRange} />
				)}
			</section>
		</PageLayout>
	);
};

export { Analytics };
