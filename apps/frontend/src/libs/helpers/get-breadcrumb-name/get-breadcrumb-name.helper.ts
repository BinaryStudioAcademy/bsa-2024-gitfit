const FIRST_CHARACTER_INDEX = 0;
const SECOND_CHARACTER_INDEX = 1;

const getBreadcrumbName = (name: string): string => {
	return name
		.split("-")
		.map(
			(word) =>
				word.charAt(FIRST_CHARACTER_INDEX).toUpperCase() +
				word.slice(SECOND_CHARACTER_INDEX),
		)
		.join(" ");
};

export { getBreadcrumbName };
