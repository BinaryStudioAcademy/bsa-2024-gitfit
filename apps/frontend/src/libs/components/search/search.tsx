import { Icon, Input } from "~/libs/components/components.js";
import { DEBOUNCE_TIMEOUT } from "~/libs/constants/constants.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useEffect, useFormWatch } from "~/libs/hooks/hooks.js";

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
	const { control, errors } = useAppForm({
		defaultValues: { search: "" },
		mode: "onChange",
	});

	const value = useFormWatch({ control, name: "search" });

	useEffect(() => {
		const debouncedOnChange = initDebounce(() => {
			onChange(value);
		}, DEBOUNCE_TIMEOUT);
		debouncedOnChange(value);

		return (): void => {
			debouncedOnChange.clear();
		};
	}, [onChange, value]);

	return (
		<Input
			control={control}
			errors={errors}
			isLabelHidden={isLabelHidden}
			label={label}
			leftIcon={<Icon height={20} name="search" width={20} />}
			name="search"
			placeholder="Enter project name"
			type="search"
		/>
	);
};

export { Search };
