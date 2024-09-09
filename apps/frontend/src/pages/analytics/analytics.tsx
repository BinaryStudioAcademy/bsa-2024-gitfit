import { DateInput, PageLayout } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const getDefaultDateRange = (): Date[] => {
	const today = new Date();
	const startOfMonth = new Date(today.getFullYear(), today.getMonth());

	return [startOfMonth, today];
};

const Analytics = (): JSX.Element => {
	const { control, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: getDefaultDateRange(),
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
				<form
					className={styles["filters-form-wrapper"]}
					onSubmit={handleFormSubmit}
				>
					<DateInput
						control={control}
						maxDate={new Date()}
						maxRange={30}
						minDate={new Date("01-01-1999")}
						name="dateRange"
					/>
				</form>
			</section>
		</PageLayout>
	);
};

export { Analytics };
