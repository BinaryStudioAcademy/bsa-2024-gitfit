import { DateInput, PageLayout } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { THIRTY_DAYS } from "./libs/constants/constants.js";
import { subtractDays } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	const { control, handleSubmit } = useAppForm({
		defaultValues: {
			dateRange: [subtractDays(new Date(), THIRTY_DAYS), new Date()],
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
