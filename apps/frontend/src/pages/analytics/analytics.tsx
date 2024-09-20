import { DateInput, Loader, PageLayout, Select } from "~/libs/components/components.js";
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
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import { getProjectOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";
//import { actions as projectActions } from "~/modules/projects/projects.js";

const Analytics = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const todayDate = new Date();
	//const dispatch = useAppDispatch();

	const { activityLogs, dataStatus } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);

	const { control, handleSubmit, isDirty } = useAppForm({
		defaultValues: {
			dateRange: [
				subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE),
				todayDate,
			] as [Date, Date],
			projects: 0,
		},
	});
	const { projects } = useAppSelector(({ projects }) => projects);

	const dateRangeValue = useFormWatch({ control, name: "dateRange" });

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


	const projectOptions = getProjectOptions(projects);

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
					<div className={styles["wraper-selector"]}>
						<Select
							control={control}
							isClearable
							isLabelHidden
							isSearchable
							label="Select project"
							name="projects"
							options={projectOptions}
							placeholder="Select project"
						/>
					</div>
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
					/>
				)}
			</section>
		</PageLayout>
	);
};

export { Analytics };
