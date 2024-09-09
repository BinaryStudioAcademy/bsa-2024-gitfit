import { useEffect } from "react";

import { Checkbox } from "~/libs/components/components.js";
import { useAppForm, useFormWatch } from "~/libs/hooks/hooks.js";

type Properties = {
	id: string;
	isChecked: boolean;
	onToggle: (id: number) => void;
};

const SelectRowCell = ({
	id,
	isChecked,
	onToggle,
}: Properties): JSX.Element => {
	const { control, errors, handleValueSet } = useAppForm({
		defaultValues: {
			[id]: isChecked,
		},
	});

	useEffect(() => {
		handleValueSet(id, isChecked);
	}, [id, isChecked, handleValueSet]);

	const watchedValue = useFormWatch({
		control,
		name: id,
	});

	useEffect(() => {
		if (watchedValue !== isChecked) {
			onToggle(+id);
		}
	}, [watchedValue, isChecked, id, onToggle]);

	return <Checkbox control={control} errors={errors} name={id} />;
};

export { SelectRowCell };
