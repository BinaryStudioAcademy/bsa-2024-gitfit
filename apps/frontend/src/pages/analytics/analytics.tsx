import { DateInput, PageLayout, Search } from "~/libs/components/components.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback, useSearch } from "~/libs/hooks/hooks.js";

import { AnalyticsTable } from "./libs/components/components.js";
import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const todayDate = new Date();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: [subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE), todayDate],
			search: "",
		},
	});

	const { onSearch, search } = useSearch();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(() => {
				// TODO: implement the data submission logic here
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
			<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
				<div className={styles["search-container"]}>
					<Search
						control={control}
						errors={errors}
						isLabelHidden
						label="Contributors search"
						name="search"
						onChange={handleContributorsSearchChange}
						placeholder="Enter name"
					/>
				</div>
				<DateInput
					control={control}
					maxDate={todayDate}
					maxRange={ANALYTICS_DATE_MAX_RANGE}
					name="dateRange"
				/>
			</form>
			<section>
				<AnalyticsTable search={search} />
			</section>
		</PageLayout>
	);
};

export { Analytics };
