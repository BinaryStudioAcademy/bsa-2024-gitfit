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
import { actions as activityLogActions } from "~/modules/activity/activity.js";

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

	const { control, handleSubmit, isDirty, watch } = useAppForm({
		defaultValues: {
			dateRange: initialDateRange,
		},
	});

	const handleLoadLogs = useCallback(
		([startDate, endDate]: [Date, Date]) => {
			const formattedStartDate = startDate.toISOString();
			const formattedEndDate = endDate.toISOString();

			void dispatch(
				activityLogActions.loadAll({
					endDate: formattedEndDate,
					startDate: formattedStartDate,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		handleLoadLogs(dateRange);
	}, [dateRange, handleLoadLogs]);

	const handleFormSubmit = useCallback(
		(event_?: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				handleLoadLogs(formData.dateRange);
				setDateRange(formData.dateRange);
			})(event_);
		},
		[handleLoadLogs, handleSubmit],
	);

	const dateRangeValue = watch("dateRange");

	useEffect(() => {
		if (isDirty) {
			handleFormSubmit();
		}
	}, [dateRangeValue, isDirty, handleFormSubmit]);

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
