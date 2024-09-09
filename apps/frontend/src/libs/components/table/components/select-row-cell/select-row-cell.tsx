import { useEffect } from "react";

import { Checkbox } from "~/libs/components/components.js";
import { useAppForm, useFormWatch } from "~/libs/hooks/hooks.js";

type Properties = {
	id: number;
	isChecked: boolean;
	name: string;
	onToggle: (id: number) => void;
};

const SelectRowCell = ({
	id,
	isChecked,
	name,
	onToggle,
}: Properties): JSX.Element => {
	const { control, errors } = useAppForm({
		defaultValues: {
			[name]: isChecked,
		},
	});

	const watchedValue = useFormWatch({
		control,
		name,
	});

	useEffect(() => {
		if (watchedValue !== isChecked) {
			onToggle(id);
		}
	}, [watchedValue, isChecked, id, onToggle]);

	return <Checkbox control={control} errors={errors} name={name} />;
};

export { SelectRowCell };
