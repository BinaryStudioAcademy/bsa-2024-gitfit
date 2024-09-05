import { Icon, Input } from "~/libs/components/components.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useEffect, useFormWatch } from "~/libs/hooks/hooks.js";

import { SEARCH_TIMEOUT } from "./libs/constants/constants.js";
import { useSearchQueryParameters } from "./libs/hooks/use-search-query.hook.js"; // Import the hook

type Properties = {
	isLabelHidden: boolean;
	label: string;
	onChange: (search: string) => void;
};

const Search = ({
	isLabelHidden,
	label,
	onChange,
}: Properties): JSX.Element => {
	// Initialize searchQueryParams hook
	const { searchQuery, updateSearchParams } = useSearchQueryParameters("");

	// Set up form control
	const { control, errors } = useAppForm({
		defaultValues: { search: searchQuery }, // Initialize with query parameter value
		mode: "onChange",
	});

	// Watch for changes in the search input
	const value = useFormWatch({ control, name: "search" });

	useEffect(() => {
		const debouncedOnChange = initDebounce(() => {
			onChange(value);
			updateSearchParams(value); // Update the query parameters on input change
		}, SEARCH_TIMEOUT);

		debouncedOnChange(value);

		return (): void => {
			debouncedOnChange.clear();
		};
	}, [onChange, value, updateSearchParams]);

	return (
		<Input
			control={control}
			errors={errors}
			isLabelHidden={isLabelHidden}
			label={label}
			leftIcon={<Icon height={20} name="search" width={20} />} // Icon reintroduced here
			name="search"
			placeholder="Enter project name"
			type="search"
		/>
	);
};

export { Search };
