import { Calendar } from "react-calendar";
import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon, Popover } from "~/libs/components/components.js";
import { formatDate } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useFormController,
	usePopover,
} from "~/libs/hooks/hooks.js";

import { addDays, getDifferenceInDays } from "./libs/helpers/helpers.js";
import { type DateValue } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	maxRange?: number;
	name: FieldPath<T>;
};

const DateInput = <T extends FieldValues>({
	control,
	maxRange,
	name,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	const { isOpened, onClose, onOpen } = usePopover();

	const getSelectedDateRange = (): string => {
		const [startDate, endDate] = field.value as Date[];

		return `${formatDate(startDate as Date, "MMM d, yyyy")} - ${formatDate(endDate as Date, "MMM d, yyyy")}`;
	};

	const handleDateChange = useCallback(
		(dates: DateValue): void => {
			const [startDate, endDate] = dates as Date[];

			if (maxRange && startDate && endDate) {
				const diffInDays = getDifferenceInDays(endDate, startDate);

				if (diffInDays > maxRange) {
					const adjustedEndDate = addDays(startDate, maxRange);
					field.onChange([startDate, adjustedEndDate]);

					return;
				}
			}

			field.onChange(dates);
		},
		[field, maxRange],
	);

	const formatShortWeekday = useCallback(
		(_locale: string | undefined, date: Date): string => {
			return formatDate(date, "EEEEEE");
		},
		[],
	);

	return (
		<div>
			<Popover
				content={
					<Calendar
						calendarType="gregory"
						className={styles["calendar"]}
						formatShortWeekday={formatShortWeekday}
						locale="en"
						next2Label={null}
						nextLabel={<Icon height={16} name="rightArrow" width={16} />}
						onChange={handleDateChange}
						prev2Label={null}
						prevLabel={<Icon height={16} name="leftArrow" width={16} />}
						selectRange
						showDoubleView
						value={field.value}
					/>
				}
				isOpened={isOpened}
				onClose={onClose}
			>
				<button className={styles["date-input-trigger"]} onClick={onOpen}>
					<span className={styles["calendar-icon-wrapper"]}>
						<Icon height={20} name="calendar" width={20} />
					</span>
					<input
						className={styles["date-input-text"]}
						readOnly
						type="text"
						value={getSelectedDateRange()}
					/>
				</button>
			</Popover>
		</div>
	);
};

export { DateInput };
