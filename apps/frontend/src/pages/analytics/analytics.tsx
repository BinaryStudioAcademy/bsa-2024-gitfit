import { DateInput, PageLayout, Select } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus, QueryParameterName } from "~/libs/enums/enums.js";
import {
	formatDate,
	getEndOfDay,
	getStartOfDay,
	subtractDays,
} from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useFormWatch,
	useSearchFilters,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { actions as activityLogActions } from "~/modules/activity/activity.js";

import {
	AnalyticsContributorsSearch,
	AnalyticsTable,
} from "./libs/components/components.js";
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

	const { onSearch, search } = useSearchFilters();

	const { activityLogs, dataStatus, projects } = useAppSelector(
		({ activityLogs }) => activityLogs,
	);

	useEffect(() => {
		void dispatch(activityLogActions.loadAllProjects());
	}, [dispatch]);

	const [searchParameters] = useSearchParams();
	const projectIdQueryParameter = searchParameters.get(
		QueryParameterName.PROJECT_ID,
	);

	const { onSearch: onSelect } = useSearchFilters({
		queryParameterName: QueryParameterName.PROJECT_ID,
	});

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: [
				subtractDays(todayDate, ANALYTICS_DEFAULT_DATE_RANGE),
				todayDate,
			] as [Date, Date],
			project: projectIdQueryParameter ? Number(projectIdQueryParameter) : null,
			search,
		},
	});

	const handleSearchChange = useCallback(
		(value: string) => {
			onSearch(value);
		},
		[onSearch],
	);

	const dateRangeValue = useFormWatch({ control, name: "dateRange" });
	const projectValue = useFormWatch({ control, name: "project" });

	useEffect(() => {
		onSelect(projectValue ? String(projectValue) : "");
	}, [onSelect, projectValue]);

	const handleLoadLogs = useCallback(
		([startDate, endDate]: [Date, Date], projectId?: null | number) => {
			const formattedStartDate = formatDate(
				getStartOfDay(startDate),
				"yyyy-MM-dd",
			);
			const formattedEndDate = formatDate(getEndOfDay(endDate), "yyyy-MM-dd");

			void dispatch(
				activityLogActions.loadAll({
					contributorName: search,
					endDate: formattedEndDate,
					projectId: projectId ?? undefined,
					startDate: formattedStartDate,
				}),
			);
		},
		[dispatch, search],
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

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	const hasSearch = search.length !== EMPTY_LENGTH;
	const emptyPlaceholderMessage = hasSearch
		? "No contributors matching your search criteria."
		: "There is nothing yet.";

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section>
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<AnalyticsContributorsSearch
						control={control}
						errors={errors}
						name="search"
						onChange={handleSearchChange}
					/>
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
					<div className={styles["date-input-wrapper"]}>
						<DateInput
							control={control}
							maxDate={todayDate}
							maxRange={ANALYTICS_DATE_MAX_RANGE}
							minDate={minChoosableDate}
							name="dateRange"
						/>
					</div>
				</form>
				<AnalyticsTable
					activityLogs={activityLogs}
					dateRange={dateRangeValue}
					emptyPlaceholder={emptyPlaceholderMessage}
					isLoading={isLoading}
				/>
			</section>
		</PageLayout>
	);
};

export { Analytics };
