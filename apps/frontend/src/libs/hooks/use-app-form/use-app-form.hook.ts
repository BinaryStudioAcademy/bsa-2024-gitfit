import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormClearErrors,
	type UseFormHandleSubmit,
	type UseFormProps,
	type UseFormSetValue,
	type UseFormTrigger,
	type UseFormWatch,
	type ValidationMode,
} from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types.js";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	handleErrorsClear: UseFormClearErrors<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	handleTrigger: UseFormTrigger<T>;
	handleValueSet: UseFormSetValue<T>;
	isDirty: boolean;
	watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	const parameters: UseFormProps<T> = {
		defaultValues,
		mode,
	};

	if (validationSchema) {
		parameters.resolver = zodResolver(validationSchema);
	}

	const {
		clearErrors,
		control,
		formState: { errors, isDirty },
		handleSubmit,
		setValue,
		trigger,
		watch,
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		handleErrorsClear: clearErrors,
		handleSubmit,
		handleTrigger: trigger,
		handleValueSet: setValue,
		isDirty,
		watch,
	};
};

export { useAppForm };
