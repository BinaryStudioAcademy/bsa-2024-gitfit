import {
	DateInput,
	Loader,
	PageLayout,
	Select,
} from "~/libs/components/components.js";
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
import { actions as projectActions } from "~/modules/projects/projects.js";

import { AnalyticsTable } from "./libs/components/components.js";
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import { getProjectOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const todayDate = new Date();

	const { activityLogs, dataStatus } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);
	const { projects } = useAppSelector(({ projects }) => projects);

	useEffect(() => {
		void dispatch(projectActions.loadAll());
	}, [dispatch, projects]);

	const { control, handleSubmit, isDirty } = useAppForm({
		defaultValues: {
			dateRange: [
				subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE),
				todayDate,
			] as [Date, Date],
			project: null,
		},
	});

	const dateRangeValue = useFormWatch({ control, name: "dateRange" });
	const projectValue = useFormWatch({ control, name: "project" });

	const handleLoadLogs = useCallback(
		([startDate, endDate]: [Date, Date], projectId?: null | number) => {
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
					<div className={styles["wraper-selector"]}>
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
