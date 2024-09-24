import { DateInput, PageLayout, Select } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useFormWatch,
} from "~/libs/hooks/hooks.js";
import { actions as activityLogActions } from "~/modules/activity/activity.js";

import { AnalyticsTable } from "./libs/components/components.js";
import {
	ANALYTICS_DATE_MAX_RANGE,
	ANALYTICS_DEFAULT_DATE_RANGE,
	ANALYTICS_LOOKBACK_DAYS_COUNT,
} from "./libs/constants/constants.js";
import { getProjectOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const todayDate = new Date();
	const minChoosableDate = subtractDays(
		todayDate,
		ANALYTICS_LOOKBACK_DAYS_COUNT,
	);

	const { activityLogs, dataStatus, projects } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);

	useEffect(() => {
		void dispatch(activityLogActions.loadAllProjects());
	}, [dispatch]);

	const { control, handleSubmit, isDirty } = useAppForm({
		defaultValues: {
			dateRange: [
				subtractDays(todayDate, ANALYTICS_DEFAULT_DATE_RANGE),
				todayDate,
			] as [Date, Date],
			project: null,
		},
	});

	const dateRangeValue = useFormWatch({ control, name: "dateRange" });
	const projectValue = useFormWatch({ control, name: "project" });

	const handleLoadLogs = useCallback(
		([startDate, endDate]: [Date, Date], projectId?: null | string) => {
			const formattedStartDate = startDate.toISOString();
			const formattedEndDate = endDate.toISOString();

			void dispatch(
				activityLogActions.loadAll({
					endDate: formattedEndDate,
					projectId: projectId ?? undefined,
					startDate: formattedStartDate,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		handleLoadLogs(dateRangeValue, projectValue);
	}, [dateRangeValue, projectValue, handleLoadLogs]);

	const handleFormSubmit = useCallback(
		(event_?: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				handleLoadLogs(formData.dateRange, formData.project);
			})(event_);
		},
		[handleLoadLogs, handleSubmit],
	);

	const projectOptions = getProjectOptions(projects);

	useEffect(() => {
		if (isDirty) {
			handleFormSubmit();
		}
	}, [dateRangeValue, projectValue, isDirty, handleFormSubmit]);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section>
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<div className={styles["select-wrapper"]}>
						<Select
							control={control}
							isClearable
							isLabelHidden
							isSearchable
							label="Select project"
							name="project"
							options={projectOptions}
							placeholder="Select project"
						/>
					</div>
					<DateInput
						control={control}
						maxDate={todayDate}
						maxRange={ANALYTICS_DATE_MAX_RANGE}
						minDate={minChoosableDate}
						name="dateRange"
					/>
				</form>
				<AnalyticsTable
					activityLogs={activityLogs}
					dateRange={dateRangeValue}
					isLoading={isLoading}
				/>
			</section>
		</PageLayout>
	);
};

export { Analytics };
