import Select, {
	type MultiValue,
	type PropsValue,
	type SingleValue,
} from "react-select";

import { type Option } from "./libs/types/types.js";

type Properties = {
	isMulti?: boolean;
	onChange: (newValue: MultiValue<Option> | SingleValue<Option>) => void;
	options: Option[];
	placeholder?: string;
	title?: string;
	value: PropsValue<Option>;
};

const CustomSelect = ({
	isMulti = false,
	onChange,
	options,
	placeholder,
	title,
	value,
}: Properties): JSX.Element => {
	return (
		<div>
			{title && <p>{title}</p>}
			<Select
				isMulti={isMulti}
				onChange={onChange}
				options={options}
				placeholder={placeholder}
				value={value}
			/>
		</div>
	);
};

export { CustomSelect };
