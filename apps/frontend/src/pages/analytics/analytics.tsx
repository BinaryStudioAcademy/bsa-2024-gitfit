import { DateInput, Loader, PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useFormWatch,
	useSearch,
} from "~/libs/hooks/hooks.js";
import { actions as activityLogActions } from "~/modules/activity/activity.js";

import {
	AnalyticsContributorsSearch,
	AnalyticsTable,
} from "./libs/components/components.js";
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const todayDate = new Date();

	const { activityLogs, dataStatus } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);

	const { control, errors, handleSubmit, isDirty } = useAppForm({
		defaultValues: {
			dateRange: [
				subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE),
				todayDate,
			] as [Date, Date],
			search: "",
		},
	});

	const dateRangeValue = useFormWatch({ control, name: "dateRange" });
	const { onSearch, search } = useSearch();

	const handleLoadLogs = useCallback(
		([startDate, endDate]: [Date, Date]) => {
			const formattedStartDate = startDate.toISOString();
			const formattedEndDate = endDate.toISOString();

			void dispatch(
				activityLogActions.loadAll({
					endDate: formattedEndDate,
					search,
					startDate: formattedStartDate,
				}),
			);
		},
		[dispatch, search],
	);

	useEffect(() => {
		handleLoadLogs(dateRangeValue);
	}, [dateRangeValue, handleLoadLogs]);

	const handleFormSubmit = useCallback(
		(event_?: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				handleLoadLogs(formData.dateRange);
			})(event_);
		},
		[handleLoadLogs, handleSubmit],
	);

	const handleContributorsSearchChange = useCallback(
		(value: string) => {
			onSearch(value);
		},
		[onSearch],
	);

	useEffect(() => {
		if (isDirty) {
			handleFormSubmit();
		}
	}, [dateRangeValue, isDirty, handleFormSubmit]);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section>
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<AnalyticsContributorsSearch
						control={control}
						errors={errors}
						name="search"
						onChange={handleContributorsSearchChange}
					/>
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
					<AnalyticsTable
						activityLogs={activityLogs}
						dateRange={dateRangeValue}
						search={search}
					/>
				)}
			</section>
		</PageLayout>
	);
};

export { Analytics };
