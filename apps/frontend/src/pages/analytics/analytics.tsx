import { DateInput, PageLayout, Select } from "~/libs/components/components.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import {
	//useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	//	useEffect,
} from "~/libs/hooks/hooks.js";

import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import { getProjectOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";
//import { actions as projectActions } from "~/modules/projects/projects.js";

const Analytics = (): JSX.Element => {
	const todayDate = new Date();
	//const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	void dispatch(projectActions.loadAll());
	// }, [dispatch]);

	const { control, handleSubmit } = useAppForm<{
		dateRange: [Date, Date];
		projects: number;
	}>({
		defaultValues: {
			dateRange: [subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE), todayDate],
			projects: 0,
		},
	});
	const { projects } = useAppSelector(({ projects }) => projects);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(() => {
				// TODO: implement this function
			})(event_);
		},
		[handleSubmit],
	);

	const projectOptions = getProjectOptions(projects);

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
			</section>
		</PageLayout>
	);
};

export { Analytics };
