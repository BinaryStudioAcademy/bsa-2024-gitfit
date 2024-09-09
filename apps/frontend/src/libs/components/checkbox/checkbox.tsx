import { type Control, type FieldErrors } from "react-hook-form";

import { Input } from "../components.js";

type Properties = {
	control: Control;
	errors: FieldErrors;
	name: string;
};

const Checkbox = ({ control, errors, name }: Properties): JSX.Element => {
	return (
		<Input
			control={control}
			errors={errors}
			isLabelHidden
			label="Checkbox"
			name={name}
			type="checkbox"
		/>
	);
};

export { Checkbox };
