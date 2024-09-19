import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Icon, Input } from "~/libs/components/components.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useEffect, useFormWatch } from "~/libs/hooks/hooks.js";

import { SEARCH_TIMEOUT } from "./libs/constants/constants.js";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isLabelHidden: boolean;
	label: string;
	name: FieldPath<T>;
	onChange: (search: string) => void;
	placeholder: string;
};

const Search = <T extends FieldValues>({
	control,
	errors,
	isLabelHidden,
	label,
	name,
	onChange,
	placeholder,
}: Properties<T>): JSX.Element => {
	const value = useFormWatch({
		control,
		name,
	});

	useEffect(() => {
		const debouncedOnChange = initDebounce(() => {
			onChange(value ?? "");
		}, SEARCH_TIMEOUT);

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
			name={name}
			placeholder={placeholder}
			type="search"
		/>
	);
};

export { Search };
