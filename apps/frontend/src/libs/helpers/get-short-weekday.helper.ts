const START_OF_WORD = 0;
const END_OF_WORD = 2;

const getShortWeekday = (locale: string | undefined, date: Date): string => {
	const dayName = date.toLocaleDateString(locale, { weekday: "short" });

	return dayName.slice(START_OF_WORD, END_OF_WORD);
};

export { getShortWeekday };
