import { DateInput, PageLayout } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { ANALYTICS_DATE_MAX_RANGE } from "./libs/constants/constants.js";
import { subtractDays } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const todayDate = new Date();

	const { control, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: [subtractDays(todayDate, ANALYTICS_DATE_MAX_RANGE), todayDate],
		},
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(() => {
				// TODO: implement this function
			})(event_);
		},
		[handleSubmit],
	);

	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
			<section>
				<form className={styles["filters-form"]} onSubmit={handleFormSubmit}>
					<DateInput
						control={control}
						maxDate={new Date()}
						maxRange={ANALYTICS_DATE_MAX_RANGE}
						name="dateRange"
					/>
				</form>
			</section>
		</PageLayout>
	);
};

export { Analytics };
