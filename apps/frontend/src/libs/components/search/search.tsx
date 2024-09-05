import { Input } from "~/libs/components/components.js";
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
	const { searchQuery, updateSearchParams } = useSearchQueryParameters("");

	const { control, errors } = useAppForm({
		defaultValues: { search: searchQuery },
		mode: "onChange",
	});

	const value = useFormWatch({ control, name: "search" });

	useEffect(() => {
		const debouncedOnChange = initDebounce(() => {
			onChange(value);
			updateSearchParams(value);
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
			name="search"
			placeholder="Enter project name"
			type="search"
		/>
	);
};

export { Search };
