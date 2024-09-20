import { DateInput, PageLayout } from "~/libs/components/components.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback, useSearch } from "~/libs/hooks/hooks.js";

import {
	AnalyticsTable,
	ContributorsSearch,
} from "./libs/components/components.js";
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js"; // Import the mock AnalyticsTable
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const todayDate = new Date();

	const { control, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: [subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE), todayDate],
		},
	});

	const { onSearch, search } = useSearch();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(() => {
				// TODO: handle form submission logic here
			})(event_);
		},
		[handleSubmit],
	);

	const handleContributorsSearchChange = useCallback(
		(value: string) => {
			onSearch(value);
		},
		[onSearch],
	);

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section className={styles["filters"]}>
				<ContributorsSearch onChange={handleContributorsSearchChange} />
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<DateInput
						control={control}
						maxDate={todayDate}
						maxRange={ANALYTICS_DATE_MAX_RANGE}
						name="dateRange"
					/>
				</form>
			</section>
			<section>
				<AnalyticsTable search={search} />
			</section>
		</PageLayout>
	);
};

export { Analytics };
