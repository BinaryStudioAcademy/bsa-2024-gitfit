import { Checkbox } from "~/libs/components/components.js";
import { useAppForm, useEffect, useFormWatch } from "~/libs/hooks/hooks.js";

type Properties = {
	id: number;
	isChecked: boolean;
	onToggle: (id: number) => void;
};

const SelectRowCell = ({
	id,
	isChecked,
	onToggle,
}: Properties): JSX.Element => {
	const fieldName = id.toString();

	const { control, errors, handleValueSet } = useAppForm({
		defaultValues: {
			[fieldName]: isChecked,
		},
	});

	useEffect(() => {
		handleValueSet(fieldName, isChecked);
	}, [isChecked, handleValueSet, fieldName]);

	const watchedValue = useFormWatch({
		control,
		name: fieldName,
	});

	useEffect(() => {
		if (watchedValue !== isChecked) {
			onToggle(id);
		}
	}, [watchedValue, isChecked, id, onToggle]);

	return <Checkbox control={control} errors={errors} name={fieldName} />;
};

export { SelectRowCell };
