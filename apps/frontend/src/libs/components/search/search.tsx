import { Icon, Input } from "~/libs/components/components.js";
import { debounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useEffect } from "~/libs/hooks/hooks.js";

type Properties = {
	onChange: (search: string) => void;
};

const Search = ({ onChange }: Properties): JSX.Element => {
	const { control, errors, watch } = useAppForm({
		defaultValues: { search: "" },
		mode: "onChange",
	});

	const value = watch("search");

	useEffect(() => {
		const debouncedOnChange = debounce(() => {
			onChange(value);
		});
		debouncedOnChange(value);

		return (): void => {
			debouncedOnChange.clear();
		};
	}, [onChange, value]);

	return (
		<Input
			control={control}
			errors={errors}
			leftIcon={<Icon height={20} name="search" width={20} />}
			name="search"
			placeholder="Enter project name"
			type="text"
		/>
	);
};

export { Search };
