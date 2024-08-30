import { Icon, Input } from "~/libs/components/components.js";
import { debounce } from "~/libs/helpers/helpers.js";
import { useAppForm, useEffect, useFormWatch } from "~/libs/hooks/hooks.js";

type Properties = {
	isLabelVisible: boolean;
	label: string;
	onChange: (search: string) => void;
};

const Search = ({
	isLabelVisible,
	label,
	onChange,
}: Properties): JSX.Element => {
	const { control, errors } = useAppForm({
		defaultValues: { search: "" },
		mode: "onChange",
	});

	const value = useFormWatch({ control, name: "search" });

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
			isLabelVisible={isLabelVisible}
			label={label}
			leftIcon={<Icon height={20} name="search" width={20} />}
			name="search"
			placeholder="Enter project name"
			type="text"
		/>
	);
};

export { Search };
