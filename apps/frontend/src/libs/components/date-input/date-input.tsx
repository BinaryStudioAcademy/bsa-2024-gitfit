import { Calendar } from "react-calendar";
import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon, Popover } from "~/libs/components/components.js";
import {
	addDays,
	formatDate,
	getDifferenceInDays,
} from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useFormController,
	useMemo,
	usePopover,
} from "~/libs/hooks/hooks.js";

import { type DateInputValue } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	maxDate?: Date;
	maxRange?: number;
	minDate?: Date;
	name: FieldPath<T>;
};

const DateInput = <T extends FieldValues>({
	control,
	maxDate,
	maxRange,
	minDate,
	name,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	const { isOpened, onClose, onOpen } = usePopover();

	const selectedDateRange = useMemo((): string => {
		const [startDate, endDate] = field.value as Date[];

		if (!startDate || !endDate) {
			return "Choose date range";
		}

		return `${formatDate(startDate, "MMM d, yyyy")} - ${formatDate(endDate, "MMM d, yyyy")}`;
	}, [field.value]);

	const handleDateChange = useCallback(
		(dates: DateInputValue): void => {
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

	const handleFormatShortWeekday = useCallback(
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
						formatShortWeekday={handleFormatShortWeekday}
						locale="en"
						{...(maxDate && { maxDate })}
						{...(minDate && { minDate })}
						next2Label={null}
						nextLabel={<Icon height={16} name="rightArrow" width={16} />}
						onChange={handleDateChange}
						prev2Label={null}
						prevLabel={<Icon height={16} name="leftArrow" width={16} />}
						selectRange
						showDoubleView
						value={field.value}
						view="month"
					/>
				}
				isOpened={isOpened}
				onClose={onClose}
			>
				<button
					className={styles["date-input-trigger"]}
					onClick={isOpened ? onClose : onOpen}
					type="button"
				>
					<span className={styles["calendar-icon-wrapper"]}>
						<Icon height={20} name="calendar" width={20} />
					</span>
					<input
						className={styles["date-input-text"]}
						readOnly
						type="text"
						value={selectedDateRange}
					/>
				</button>
			</Popover>
		</div>
	);
};

export { DateInput };
