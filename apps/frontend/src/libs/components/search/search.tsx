import { Icon, Input } from "~/libs/components/components.js";
import { debounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useEffect } from "~/libs/hooks/hooks.js";

type Properties = {
	onValueChange: (search: string) => void;
};

const Search = ({ onValueChange }: Properties): JSX.Element => {
	const { control, errors, watch } = useAppForm({
		defaultValues: { search: "" },
		mode: "onChange",
	});

	const value = watch("search");

	useEffect(() => {
		const debouncedOnValueChange = debounce(() => {
			onValueChange(value);
		});
		debouncedOnValueChange(value);

		return (): void => {
			debouncedOnValueChange.clear();
		};
	}, [onValueChange, value]);

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
