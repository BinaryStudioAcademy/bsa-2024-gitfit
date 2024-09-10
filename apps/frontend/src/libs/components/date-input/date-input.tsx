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

import { MILLIS_IN_DAY } from "./libs/constants/constants.js";
import { getShortWeekday } from "./libs/helpers/helpers.js";
import { type DateValue } from "./libs/types/types.js";
import "./styles.css";

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

	const getSelectedDateRange = (): string => {
		const [startDate, endDate] = field.value as Date[];

		return `${formatDate(startDate as Date, "MMM d, yyyy")} - ${formatDate(endDate as Date, "MMM d, yyyy")}`;
	};

	const handleDateChange = useCallback(
		(dates: DateValue): void => {
			const [startDate, endDate] = dates as Date[];

			if (maxRange && startDate && endDate) {
				const diffInDays =
					(endDate.getTime() - startDate.getTime()) / MILLIS_IN_DAY;

				if (diffInDays > maxRange) {
					const adjustedEndDate = new Date(startDate.getDate() + maxRange);
					field.onChange([startDate, adjustedEndDate]);

					return;
				}
			}

			field.onChange(dates);
		},
		[field, maxRange],
	);

	return (
		<div>
			<Popover
				content={
					<Calendar
						calendarType="gregory"
						formatShortWeekday={getShortWeekday}
						locale="en"
						maxDate={maxDate ?? new Date()}
						minDate={minDate ?? new Date("01-01-1999")}
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
				<button className="date-input-trigger" onClick={onOpen}>
					<Icon height={20} name="calendar" width={20} />
					{getSelectedDateRange() || "Choose date"}
				</button>
			</Popover>
		</div>
	);
};

export { DateInput };
